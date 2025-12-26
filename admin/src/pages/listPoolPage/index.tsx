import React, { useState, useEffect, useMemo } from 'react';
import {
    Container,
    Title,
    FilterSection,
    FilterRow,
    SearchInput,
    FilterButton,
    SortSelect,
    PoolCard,
    PoolHeader,
    PoolInfo,
    TokenInfo,
    StatItem,
    StatLabel,
    StatValue,
    ExpandButton,
    PoolContent,
    ActionButton,
    APRValue,
    CopyButton,
    ActionInput,
    ActionButtons,
} from './index.element';
import useContract from '../../hooks/useContract';
import { useEthersSigner } from '../../utils/getSigner';
import usePool from '../../hooks/usePool';
import { formatNumber } from '../../utils/formatNumber';
import TokenEditModal from './TokenEditModal';
import { verify } from 'crypto';

const CopyIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>
);

const CheckIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

type SortOption = 'tvl' | 'apy' | 'reward';
type FilterStatus = 'all' | 'active' | 'ended' | 'boosted';

const ListPoolPage = () => {
    const signer = useEthersSigner();
    const { getBlockNumber } = useContract();
    const { pools, getPools, verifyPool, addLiquidityLink } = usePool();

    const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
    const [expandedPoolId, setExpandedPoolId] = useState<string | null>(null);
    const [initialLoading, setInitialLoading] = useState(true);
    const [currentBlockNumber, setCurrentBlockNumber] = useState<number>(0);
    const [liquidityLink, setLiquidityLink] = useState<string>('');
    // Filter states
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState<SortOption>('tvl');
    const [statusFilter, setStatusFilter] = useState<FilterStatus>('all');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const poolsPerPage = 10;

    // Modal states
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (signer) {
            initializePage();
        }
    }, [signer]);

    // Reset copied state after 2 seconds
    useEffect(() => {
        let timeoutId: NodeJS.Timeout | null = null;

        if (copiedAddress) {
            timeoutId = setTimeout(() => {
                setCopiedAddress(null);
            }, 2000);
        }

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [copiedAddress]);


    const initializePage = async () => {
        setInitialLoading(true);
        await getPools();
        const currentBlockNumber = await getBlockNumber();
        setCurrentBlockNumber(currentBlockNumber);
        setInitialLoading(false);
    };

    const togglePool = (poolId: string) => {
        setExpandedPoolId(currentId => currentId === poolId ? null : poolId);
    };

    const handleVerifyPool = async () => {
        if (expandedPoolId) {
            await verifyPool(parseInt(expandedPoolId));
        }
    }

    const handleAddLiquidity = async () => {
        if (expandedPoolId) {
            await addLiquidityLink(parseInt(expandedPoolId), liquidityLink);
            setLiquidityLink('')
        }
    }

    const handleCopyAddress = async (address: string, e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            await navigator.clipboard.writeText(address);
            setCopiedAddress(address); // This will automatically trigger the timeout effect
        } catch (err) {
            console.error('Failed to copy address:', err);
        }
    };

    const renderTokenInfo = (token: any, label: string, isVerified: boolean) => (
        <TokenInfo>
            <img src={token?.logo || '/default-token.jpg'} alt={`${label} Token`} />
            <div>
                <div className="token-symbol-container">
                    <div className="token-symbol">{token?.symbol || `${label} Token`}</div>
                    {isVerified && (
                        <span className="verified-badge" style={{ backgroundColor: '#4CAF50', color: 'white', padding: '2px 6px', borderRadius: '50%', fontSize: '12px', marginLeft: '4px' }}>✓</span>
                    )}
                </div>
                <div className="token-address-container">
                    <div className="token-address">
                        {`${token?.address.substring(0, 6)}...${token?.address.substring(token?.address.length - 4)}`}
                    </div>

                    <CopyButton
                        onClick={(e) => handleCopyAddress(token?.address, e)}
                        className={copiedAddress === token?.address ? 'copied' : ''}
                        title="Copy address"
                        type="button"
                    >
                        {copiedAddress === token?.address ? <CheckIcon /> : <CopyIcon />}
                    </CopyButton>
                </div>
            </div>
        </TokenInfo>
    );

    const filteredAndSortedPools = useMemo(() => {
        let filtered = [...pools];

        // Apply search filter
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            filtered = filtered.filter(pool =>
                pool?.lpToken?.symbol?.toLowerCase().includes(searchLower) ||
                pool?.rewardToken?.symbol?.toLowerCase().includes(searchLower) ||
                pool?.poolId?.toString().includes(searchLower)
            );
        }

        // Apply status filter
        if (statusFilter !== 'all') {
            filtered = filtered.filter(pool => {
                const isActive = currentBlockNumber > parseInt(pool.startBlock) && currentBlockNumber <= parseInt(pool.endBlock);
                const isEnded = currentBlockNumber > parseInt(pool.endBlock);

                switch (statusFilter) {
                    case 'active':
                        return isActive;
                    case 'ended':
                        return isEnded;
                    default:
                        return true;
                }
            });
        }

        // Apply sorting
        filtered.sort((a, b) => {
            let comparison = 0;
            switch (sortBy) {
                case 'tvl':
                    comparison = parseFloat(a.TVL) - parseFloat(b.TVL);
                    break;
                case 'apy':
                    comparison = parseFloat(a.APY) - parseFloat(b.APY);
                    break;
                case 'reward':
                    comparison = parseFloat(a.rewardRate) - parseFloat(b.rewardRate);
                    break;
            }
            return sortDirection === 'desc' ? -comparison : comparison;
        });

        return filtered;
    }, [pools, searchTerm, statusFilter, sortBy, sortDirection, currentBlockNumber]);

    // Calculate pagination
    const totalPages = Math.ceil(filteredAndSortedPools.length / poolsPerPage);
    const startIndex = (currentPage - 1) * poolsPerPage;
    const endIndex = startIndex + poolsPerPage;
    const currentPools = filteredAndSortedPools.slice(startIndex, endIndex);

    const handleAddLogo = () => {
        setIsOpen(true);
    }

    if (initialLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <FilterRow>
                <Title>Farming Pools Admin</Title>
                <ActionButton className='unstake' onClick={handleAddLogo}>
                    Add Logo
                </ActionButton>
            </FilterRow>

            <FilterSection>
                <FilterRow>
                    <FilterButton
                        active={statusFilter === 'all'}
                        onClick={() => setStatusFilter('all')}
                    >
                        All Pools
                    </FilterButton>
                    <FilterButton
                        active={statusFilter === 'active'}
                        onClick={() => setStatusFilter('active')}
                    >
                        Active
                    </FilterButton>
                    <FilterButton
                        active={statusFilter === 'ended'}
                        onClick={() => setStatusFilter('ended')}
                    >
                        Ended
                    </FilterButton>
                </FilterRow>

                <FilterRow>
                    <SearchInput
                        placeholder="Search by token symbol"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <SortSelect
                        value={`${sortBy}-${sortDirection}`}
                        onChange={(e) => {
                            const [newSortBy, newDirection] = e.target.value.split('-') as [SortOption, 'asc' | 'desc'];
                            setSortBy(newSortBy);
                            setSortDirection(newDirection);
                        }}
                    >
                        <option value="tvl-desc">TVL (High to Low)</option>
                        <option value="tvl-asc">TVL (Low to High)</option>
                        <option value="apy-desc">APY (High to Low)</option>
                        <option value="apy-asc">APY (Low to High)</option>
                        <option value="reward-desc">Reward (High to Low)</option>
                        <option value="reward-asc">Reward (Low to High)</option>
                    </SortSelect>
                </FilterRow>
            </FilterSection>

            {currentPools.map((pool: any) => (
                <PoolCard key={pool.poolId}>
                    <PoolHeader
                        onClick={() => togglePool(pool.poolId)}
                        isExpanded={expandedPoolId === pool.poolId}
                    >
                        <PoolInfo>
                            {renderTokenInfo(pool?.lpToken, 'LP', pool.isVerified)}
                            {renderTokenInfo(pool?.rewardToken, 'Reward', pool.isVerified)}

                            <StatItem>
                                <StatLabel>APY</StatLabel>
                                <APRValue>
                                    <span>{Number(pool.APY).toFixed(2)}%</span>
                                </APRValue>
                            </StatItem>

                            <StatItem>
                                <StatLabel>TVL</StatLabel>
                                <StatValue>${formatNumber(pool.TVL)}</StatValue>
                            </StatItem>

                            <StatItem>
                                <StatLabel>liquidityLink</StatLabel>
                                <StatValue>{pool.liquidityLink ? pool.liquidityLink.substring(0, 26) + "..." : "undefined"}</StatValue>
                            </StatItem>

                        </PoolInfo>
                        <ExpandButton isExpanded={expandedPoolId === pool.poolId}>
                            ▼
                        </ExpandButton>
                    </PoolHeader>

                    {expandedPoolId === pool.poolId && (
                        <PoolContent>
                            <ActionButtons>
                                <ActionInput value={liquidityLink} onChange={(e) => setLiquidityLink(e.target.value)} />
                                <ActionButton className="add-liquidity" onClick={handleAddLiquidity}>
                                    Add liquidityLink
                                </ActionButton>
                            </ActionButtons>
                            <ActionButton className="claim" onClick={handleVerifyPool}>
                                Verify Pool
                            </ActionButton>
                        </PoolContent>
                    )}
                </PoolCard>
            ))}

            {/* Token Edit Modals */}
            {isOpen && (
                <TokenEditModal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                />
            )}

            {totalPages > 1 && (
                <FilterRow style={{ justifyContent: 'center', marginTop: '2rem' }}>
                    <ActionButton
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        style={{ marginRight: '1rem' }}
                    >
                        Previous
                    </ActionButton>
                    <span style={{ margin: '0 1rem', color: 'var(--text)' }}>
                        Page {currentPage} of {totalPages}
                    </span>
                    <ActionButton
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        style={{ marginLeft: '1rem' }}
                    >
                        Next
                    </ActionButton>
                </FilterRow>
            )}
        </Container>
    );
};

export default ListPoolPage;
