import styled from 'styled-components';

interface ExpandableProps {
  isExpanded: boolean;
}

// Reusing Container and Title styles from CreatePoolPage or defining similar ones
export const Container = styled.div`
  padding: 10rem 12% 0 12%;
`
export const Title = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.space.lg};
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
`;

export const PoolCard = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin-bottom: 1rem;
  box-shadow: ${({ theme }) => theme.shadows.small};
  overflow: hidden;
`;

export const PoolHeader = styled.div<ExpandableProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  cursor: pointer;
  border-bottom: ${props => props.isExpanded ? `1px solid ${props.theme.colors.border}` : 'none'};

  &:hover {
    background: ${({ theme }) => theme.colors.backgroundLight};
  }

  shouldForwardProp: (prop: string) => prop !== 'isExpanded',
`;


export const PoolInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  flex: 1;
`;

export const TokenInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 200px;
  width: 15vw;

  .token-symbol-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }

  .token-symbol {
    color: ${({ theme }) => theme.colors.text};
  }

  .token-address-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .token-address {
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const CopyButton = styled.button`
  background: none;
  border: 0px solid ${({ theme }) => theme.colors.border};
  padding: 4px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  transition: all 0.2s ease;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  outline: none;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primaryLight};
  }

  &:focus {
    outline: none;
  }

  &.copied {
    color: ${({ theme }) => theme.colors.success};
    border-color: ${({ theme }) => theme.colors.success};
    background: ${({ theme }) => theme.colors.backgroundLight};
  }

  svg {
    width: 14px;
    height: 14px;
  }
`;

export const StatsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export const StatItem = styled.div`
  width: 12vw;
`;

export const StatLabel = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 0.25rem;
`;

export const StatValue = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

export const ExpandButton = styled.button<ExpandableProps>`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  padding: 0.5rem;
  transform: ${props => props.isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'};
  transition: transform 0.2s ease;
  font-size: 1.2rem;
  line-height: 1;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const PoolContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding: 1.5rem;
  background: ${({ theme }) => theme.colors.backgroundLight};
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
`;

export const ActionInput = styled.input`
  padding: 0.75rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.875rem;
  width: 400px;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primaryLight};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const ActionButton = styled.button`
  padding: 0.75rem 2rem;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &.stake {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background};
    &:hover {
      background: ${({ theme }) => theme.colors.primaryDark};
    }
  }

  &.unstake {
    background: ${({ theme }) => theme.colors.warning};
    color: ${({ theme }) => theme.colors.background};
    &:hover {
      background: ${({ theme }) => theme.colors.primary};
    }
  }

  &.claim {
    background: ${({ theme }) => theme.colors.success};
    color: ${({ theme }) => theme.colors.background};
    &:hover {
      background: ${({ theme }) => theme.colors.primary};
    }
  }
    
  &.add-liquidity {
    background: ${({ theme }) => theme.colors.info};
    color: ${({ theme }) => theme.colors.background};
    margin-left: 4rem;
    &:hover {
      background: ${({ theme }) => theme.colors.primaryDark};
    }
  }
`;

export const YieldBooster = styled.div`
  background: ${({ theme }) => theme.colors.background};
  padding: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  margin-top: 1rem;

  .booster-title {
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text};
  }

  .booster-multiplier {
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  .booster-description {
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const BoosterTag = styled.span`
  background: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.25rem 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  font-size: 0.75rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
`;

export const APRValue = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  .original {
    text-decoration: line-through;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.875rem;
  }
`;

export const FilterSection = styled.div`
  margin-bottom: 2rem;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.small};
  display: flex;
  justify-content: space-between;
`;

export const FilterRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  align-items: center;
  justify-content: space-between;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SearchInput = styled.input`
  padding: 0.5rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.875rem;
  width: 300px;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const FilterButton = styled.button<{ active?: boolean }>`
  padding: 0.5rem 1rem;
  border: 1px solid ${({ theme, active }) => active ? theme.colors.primary : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  background: ${({ theme, active }) => active ? theme.colors.primaryLight : theme.colors.background};
  color: ${({ theme, active }) => active ? theme.colors.primary : theme.colors.text};
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 1rem; 

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const SortSelect = styled.select`
  padding: 0.5rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.875rem;
  cursor: pointer;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const AddPoolButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-left: auto;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`;

export const RewardAmount = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text};
`;

