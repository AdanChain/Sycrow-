// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract FarmingPoolManager is ReentrancyGuard {
    using SafeERC20 for ERC20;

    address public admin;
    uint256 public poolCount;

    struct FarmConfig {
        address lpTokenAddress;
        address rewardTokenAddress;
        uint256 startBlock;
        uint256 endBlock;
        uint256 rewardRate; // reward per block
    }

    struct FarmingPool {
        address poolOwner;
        uint256 accRewardPerShare; // scaled by 1e18
        uint256 totalLPTokenAmount;
        uint256 lastRewardBlock;

        ERC20 RewardToken;
        ERC20 LPToken;

        FarmConfig config;

        mapping(address => uint256) LPTokenAmount;
        mapping(address => uint256) userRewardDebt;
    }

    mapping(uint256 => FarmingPool) public pools;

    event PoolCreated(uint256 poolId, address poolOwner, address lpTokenAddress, address rewardTokenAddress, uint256 startBlock, uint256 endBlock, uint256 rewardRate);
    
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }

    modifier onlyPoolOwner(uint256 poolId) {
        require(msg.sender == pools[poolId].poolOwner, "Only pool owner can call this function");
        _;
    }

    constructor() {
        admin = msg.sender;
        poolCount = 0;
    }

    function createPool(FarmConfig memory config) external {
        require(config.startBlock < config.endBlock, "Invalid block range");
        require(config.rewardRate > 0, "Reward rate must be positive");

        FarmingPool storage newPool = pools[poolCount];
        newPool.poolOwner = msg.sender;
        newPool.config = config;
        newPool.accRewardPerShare = 0;
        newPool.lastRewardBlock = config.startBlock;

        newPool.LPToken = ERC20(config.lpTokenAddress);
        newPool.RewardToken = ERC20(config.rewardTokenAddress);

        poolCount++;

        newPool.RewardToken.safeTransferFrom(msg.sender, address(this), config.rewardRate * (config.endBlock - config.startBlock));
        emit PoolCreated(poolCount, msg.sender, config.lpTokenAddress, config.rewardTokenAddress, config.startBlock, config.endBlock, config.rewardRate);

    }

    function stake(uint256 poolId, uint256 amount) external nonReentrant {
        FarmingPool storage pool = pools[poolId];
        require(block.number >= pool.config.startBlock, "Farming has not started yet");
        require(block.number < pool.config.endBlock, "Farming has ended");
        require(amount > 0, "Amount must be greater than 0");

        _updatePool(poolId);

        if (pool.LPTokenAmount[msg.sender] > 0) {
            _claimPending(poolId, msg.sender);
        }

        pool.LPToken.safeTransferFrom(msg.sender, address(this), amount);
        pool.LPTokenAmount[msg.sender] += amount;
        pool.totalLPTokenAmount += amount;

        pool.userRewardDebt[msg.sender] = (pool.LPTokenAmount[msg.sender] * pool.accRewardPerShare) / 1e18;

    }

    function unstake(uint256 poolId, uint256 amount) external nonReentrant {
        FarmingPool storage pool = pools[poolId];
        require(amount > 0, "Amount must be greater than 0");
        require(pool.LPTokenAmount[msg.sender] >= amount, "Insufficient staked amount");

        _updatePool(poolId);
        _claimPending(poolId, msg.sender);

        pool.LPTokenAmount[msg.sender] -= amount;
        pool.totalLPTokenAmount -= amount;

        pool.LPToken.safeTransfer(msg.sender, amount);

        pool.userRewardDebt[msg.sender] = (pool.LPTokenAmount[msg.sender] * pool.accRewardPerShare) / 1e18;
    }

    function claimReward(uint256 poolId) external nonReentrant {
        FarmingPool storage pool = pools[poolId];
        require(pool.LPTokenAmount[msg.sender] > 0, "No staked LP tokens");

        _updatePool(poolId);
        _claimPending(poolId, msg.sender);

        pool.userRewardDebt[msg.sender] = (pool.LPTokenAmount[msg.sender] * pool.accRewardPerShare) / 1e18;
    }

    function _claimPending(uint256 poolId, address user) internal {
        FarmingPool storage pool = pools[poolId];
        uint256 pending = (pool.LPTokenAmount[user] * pool.accRewardPerShare) / 1e18 - pool.userRewardDebt[user];
        if (pending > 0) {
            pool.RewardToken.safeTransfer(user, pending);
        }
    }


    function emergencyWithdraw(uint256 poolId) external nonReentrant {
        FarmingPool storage pool = pools[poolId];
        uint256 amount = pool.LPTokenAmount[msg.sender];
        require(amount > 0, "Nothing to withdraw");

        pool.LPTokenAmount[msg.sender] = 0;
        pool.totalLPTokenAmount -= amount;
        pool.userRewardDebt[msg.sender] = 0;

        pool.LPToken.safeTransfer(msg.sender, amount);
    }


    function extendPoolPeriod(uint256 poolId, uint256 additionalRewardAmount) external onlyPoolOwner(poolId) {
        FarmingPool storage pool = pools[poolId];
        pool.RewardToken.safeTransferFrom(msg.sender, address(this), additionalRewardAmount);
        uint256 additionalBlocks = additionalRewardAmount / pool.config.rewardRate;
        pool.config.endBlock += additionalBlocks;
    }

    function getUserStakedAmount(uint256 poolId, address user) external view returns (uint256) {
    return pools[poolId].LPTokenAmount[user];
    }

    function getTotalStakedAmount(uint256 poolId) external view returns (uint256) {
        return pools[poolId].totalLPTokenAmount;
    }

    function getRewardTokenBalance(uint256 poolId) external view returns (uint256) {
        return pools[poolId].RewardToken.balanceOf(address(this));
    }

    function getAccRewardPerShare(uint256 poolId) external view returns (uint256) {
        return pools[poolId].accRewardPerShare;
    }

    function getUserRewardDebt(uint256 poolId, address user) external view returns (uint256) {
        return pools[poolId].userRewardDebt[user];
    }
    
    function getPoolLastRewardBlock(uint256 poolId) external view returns (uint256) {
        return pools[poolId].lastRewardBlock;
    }

    function getPoolConfig(uint256 poolId) external view returns (FarmConfig memory) {
        return pools[poolId].config;
    }

    function getPoolCount() external view returns (uint256) {
        return poolCount;
    }


    function _updatePool(uint256 poolId) internal {
        FarmingPool storage pool = pools[poolId];
        uint256 currentBlock = block.number > pool.config.endBlock ? pool.config.endBlock : block.number;

        if (currentBlock <= pool.lastRewardBlock) return;

        uint256 blocks = currentBlock - pool.lastRewardBlock;
        uint256 reward = blocks * pool.config.rewardRate;
        pool.lastRewardBlock = currentBlock;
        

        if (pool.totalLPTokenAmount == 0) return;
        pool.accRewardPerShare += (reward * 1e18) / pool.totalLPTokenAmount;
    }
}
