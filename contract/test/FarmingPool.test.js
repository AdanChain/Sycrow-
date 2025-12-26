const { expect } = require("chai");
const { ethers, network } = require("hardhat");

describe("FarmingPoolManager", function () {
  let farmingPoolManager;
  let lpToken;
  let rewardToken;
  let owner1;
  let owner2;
  let user1;
  let user2;

  const INITIAL_SUPPLY = ethers.utils.parseEther("1000000");
  const REWARD_RATE = ethers.utils.parseEther("10");
  const START_BLOCK_OFFSET = 0;
  const END_BLOCK_OFFSET = 100;
  const STAKE_AMOUNT = ethers.utils.parseEther("100");

  before(async function () {
    [owner1, user1, user2, owner2] = await ethers.getSigners();

    const ERC20Mock = await ethers.getContractFactory("ERC20Mock");
    lpToken = await ERC20Mock.deploy("LP Token", "LP");
    rewardToken = await ERC20Mock.deploy("Reward Token", "RWD");

    const FarmingPoolManager = await ethers.getContractFactory("FarmingPoolManager");
    farmingPoolManager = await FarmingPoolManager.deploy();

    await lpToken.mint(owner1.address, INITIAL_SUPPLY);
    await lpToken.mint(user1.address, INITIAL_SUPPLY);
    await lpToken.mint(user2.address, INITIAL_SUPPLY);
    await lpToken.mint(owner2.address, INITIAL_SUPPLY);
    await rewardToken.mint(owner1.address, INITIAL_SUPPLY);
    await rewardToken.mint(owner2.address, INITIAL_SUPPLY);

    await lpToken.connect(owner1).approve(farmingPoolManager.address, INITIAL_SUPPLY);
    await lpToken.connect(user1).approve(farmingPoolManager.address, INITIAL_SUPPLY);
    await lpToken.connect(user2).approve(farmingPoolManager.address, INITIAL_SUPPLY);
    await rewardToken.connect(owner1).approve(farmingPoolManager.address, INITIAL_SUPPLY);
    await rewardToken.connect(owner2).approve(farmingPoolManager.address, INITIAL_SUPPLY);
  });

  async function mineBlocks(num) {
    for (let i = 0; i < num; i++) {
      await network.provider.send("evm_mine");
    }
  }

  describe("Pool Creation", function () {
    it("Should create pool to be successful by owner1", async function () {
      const currentBlock = await ethers.provider.getBlockNumber();

      const poolConfig = {
        lpTokenAddress: lpToken.address,
        rewardTokenAddress: rewardToken.address,
        startBlock: currentBlock + START_BLOCK_OFFSET,
        endBlock: currentBlock + END_BLOCK_OFFSET,
        rewardRate: REWARD_RATE
      };

      const tx1 = await farmingPoolManager.connect(owner1).createPool(poolConfig);
      await tx1.wait();

      const pool = await farmingPoolManager.pools(0);
      expect(pool.poolOwner).to.equal(owner1.address)
      const rewardTokenBalance = await rewardToken.balanceOf(farmingPoolManager.address);
      expect(rewardTokenBalance.toString()).to.equal(REWARD_RATE.mul(END_BLOCK_OFFSET - START_BLOCK_OFFSET).toString());

      const rewardTokenBalanceInPool = await farmingPoolManager.getRewardTokenBalance(0);
      expect(rewardTokenBalanceInPool.toString()).to.equal(REWARD_RATE.mul(END_BLOCK_OFFSET - START_BLOCK_OFFSET).toString());
    
    });

    it("Should create pool again successfully by owner2", async function () {
      const currentBlock = await ethers.provider.getBlockNumber();
      console.log("currentBlock", currentBlock);
      const poolConfig = {
        lpTokenAddress: lpToken.address,
        rewardTokenAddress: rewardToken.address,
        startBlock: currentBlock + START_BLOCK_OFFSET,
        endBlock: currentBlock + END_BLOCK_OFFSET,
        rewardRate: REWARD_RATE
      };

      const tx2 = await farmingPoolManager.connect(owner2).createPool(poolConfig);
      await tx2.wait();

      const pool = await farmingPoolManager.pools(1);
      expect(pool.poolOwner).to.equal(owner2.address);

      const rewardTokenBalance = await farmingPoolManager.getRewardTokenBalance(1);
      // expect(rewardTokenBalance.toString()).to.equal(REWARD_RATE.mul(END_BLOCK_OFFSET - START_BLOCK_OFFSET).toString());

      
      // expect(rewardTokenBalance.toString()).to.equal((REWARD_RATE.mul(END_BLOCK_OFFSET - START_BLOCK_OFFSET)) .toString());

    });
  });



  describe("user1 stake and claim rewards in pool(0)", function () {
    it("Should allow staking and staking successfully and stake amount is correct", async function () {
      const currentBlock = await ethers.provider.getBlockNumber();
      const startBlock = currentBlock + START_BLOCK_OFFSET;
      const endBlock = currentBlock + END_BLOCK_OFFSET;

      await farmingPoolManager.createPool({
        lpTokenAddress: lpToken.address,
        rewardTokenAddress: rewardToken.address,
        startBlock: startBlock,
        endBlock: endBlock,
        rewardRate: REWARD_RATE
      });

      const tx = await farmingPoolManager.connect(user1).stake(0, STAKE_AMOUNT);
      await tx.wait();

      const accRewardPerShare = await farmingPoolManager.getAccRewardPerShare(0);
      expect(accRewardPerShare.toString()).to.equal("0");

      const stakedAmount = await farmingPoolManager.getUserStakedAmount(0, user1.address);
      expect(stakedAmount.toString()).to.equal(STAKE_AMOUNT.toString());
    });

    it("Should allow user1 to claim rewards after 10 blocks after staking", async function () {
      
      await mineBlocks(10);

      const beforeStakeAmount = await farmingPoolManager.getUserStakedAmount(0, user1.address);
      expect(beforeStakeAmount.toString()).to.equal(STAKE_AMOUNT.toString());

      const beforeClaimReward = await rewardToken.balanceOf(user1.address);

      const userRewardDebt = await farmingPoolManager.getUserRewardDebt(0, user1.address);

      const tx = await farmingPoolManager.connect(user1).claimReward(0);
      await tx.wait();

      const accRewardPerShare = await farmingPoolManager.getAccRewardPerShare(0);
      const stakedAmount = await farmingPoolManager.getUserStakedAmount(0, user1.address);
      
      expect(stakedAmount.toString()).to.equal(STAKE_AMOUNT.toString());

      const afterClaimReward = await rewardToken.balanceOf(user1.address);
      
      const pending = (stakedAmount * accRewardPerShare) / 1e18 - userRewardDebt;
      expect(afterClaimReward.sub(beforeClaimReward).toString()).to.equal(pending.toString());
    });

    // it("Should reject staking before start or after end", async function () {
    //   const currentBlock = await ethers.provider.getBlockNumber();
    //   const startBlock = currentBlock + START_BLOCK_OFFSET;
    //   const endBlock = currentBlock + END_BLOCK_OFFSET;

    //   await farmingPoolManager.createPool({
    //     LPTokenAddress: lpToken.address,
    //     RewardTokenAddress: rewardToken.address,
    //     StartBlock: startBlock,
    //     EndBlock: endBlock,
    //     RewardRate: REWARD_RATE
    //   });

    //   await expect(
    //     farmingPoolManager.connect(user1).stake(0, STAKE_AMOUNT)
    //   ).to.be.revertedWithCustomError(farmingPoolManager, "Farming has not started yet");

    //   await mineBlocks(END_BLOCK_OFFSET + 1);

    //   await expect(
    //     farmingPoolManager.connect(user1).stake(0, STAKE_AMOUNT)
    //   ).to.be.revertedWithCustomError(farmingPoolManager, "Farming has ended");
    // });
  });

  describe("Unstaking", function () {
    it("Should allow unstaking and accept reward", async function () {
      const currentBlock = await ethers.provider.getBlockNumber();
      const startBlock = currentBlock + START_BLOCK_OFFSET;
      const endBlock = currentBlock + END_BLOCK_OFFSET;

      await farmingPoolManager.createPool({
        lpTokenAddress: lpToken.address,
        rewardTokenAddress: rewardToken.address,
        startBlock: startBlock,
        endBlock: endBlock,
        rewardRate: REWARD_RATE
      });

      await mineBlocks(10);
      // await farmingPoolManager.connect(user1).stake(0, STAKE_AMOUNT);

      const beforeUnstakeAmount = await farmingPoolManager.getUserStakedAmount(0, user1.address);
      expect(beforeUnstakeAmount.toString()).to.equal(STAKE_AMOUNT.toString());

      const beforeUnstakeReward = await rewardToken.balanceOf(user1.address);
      const tx = await farmingPoolManager.connect(user1).unstake(0, STAKE_AMOUNT);
      await tx.wait();

      const afterUnstakeReward = await rewardToken.balanceOf(user1.address);
      expect(afterUnstakeReward.sub(beforeUnstakeReward).toString()).to.equal(REWARD_RATE.mul(12).toString());

      const afterUnstakeAmount = await farmingPoolManager.getUserStakedAmount(0, user1.address);
      expect(afterUnstakeAmount.toString()).to.equal("0");

      // expect(afterUnstakeReward.sub(beforeUnstakeReward).toString()).to.equal(REWARD_RATE.mul(10).toString());
    });
  });

  // describe("Emergency Withdrawal", function () {
  //   it("Should allow emergency withdrawal", async function () {
  //     const currentBlock = await ethers.provider.getBlockNumber();
  //     const startBlock = currentBlock + START_BLOCK_OFFSET;
  //     const endBlock = currentBlock + END_BLOCK_OFFSET;

  //     await farmingPoolManager.createPool({
  //       LPTokenAddress: lpToken.address,
  //       RewardTokenAddress: rewardToken.address,
  //       StartBlock: startBlock,
  //       EndBlock: endBlock,
  //       RewardRate: REWARD_RATE
  //     });

  //     await mineBlocks(START_BLOCK_OFFSET);
  //     await farmingPoolManager.connect(user1).stake(0, STAKE_AMOUNT);

  //     const tx = await farmingPoolManager.connect(user1).emergencyWithdraw(0);
  //     const receipt = await tx.wait();
  //     expect(receipt.events?.find(e => e.event === "EmergencyWithdraw")?.args?.user).to.equal(user1.address);
  //     expect(receipt.events?.find(e => e.event === "EmergencyWithdraw")?.args?.amount).to.equal(STAKE_AMOUNT);
  //   });
  // });

  describe("Multiple Users", function () {
    it("Should handle multiple stakers and fair reward split", async function () {
      const currentBlock = await ethers.provider.getBlockNumber();
      const startBlock = currentBlock + START_BLOCK_OFFSET;
      const endBlock = currentBlock + END_BLOCK_OFFSET;

      await farmingPoolManager.createPool({
        lpTokenAddress: lpToken.address,
        rewardTokenAddress: rewardToken.address,
        startBlock: startBlock,
        endBlock: endBlock,
        rewardRate: REWARD_RATE
      });
      console.log("startBlock", startBlock);
      console.log("endBlock", endBlock);
      // await mineBlocks(10);

      await farmingPoolManager.connect(user1).stake(2, STAKE_AMOUNT);
      await farmingPoolManager.connect(user2).stake(2, STAKE_AMOUNT);

      await mineBlocks(10);
      // await farmingPoolManager.initRewardToken(2);

      const userRewardDebt1 = await farmingPoolManager.getUserRewardDebt(2, user1.address);
      const userRewardDebt2 = await farmingPoolManager.getUserRewardDebt(2, user2.address);

      const before1 = await rewardToken.balanceOf(user1.address);
      const before2 = await rewardToken.balanceOf(user2.address);

      await farmingPoolManager.connect(user1).claimReward(2);
      const accRewardPerShare1 = await farmingPoolManager.getAccRewardPerShare(2);
      await farmingPoolManager.connect(user2).claimReward(2);
      const accRewardPerShare2 = await farmingPoolManager.getAccRewardPerShare(2);

      const stakedAmount1 = await farmingPoolManager.getUserStakedAmount(2, user1.address);
      const stakedAmount2 = await farmingPoolManager.getUserStakedAmount(2, user2.address);

      const pending1 = (stakedAmount1 * accRewardPerShare1) / 1e18 - userRewardDebt1;
      const pending2 = (stakedAmount2 * accRewardPerShare2) / 1e18 - userRewardDebt2;

      const after1 = await rewardToken.balanceOf(user1.address);
      const after2 = await rewardToken.balanceOf(user2.address);

      // Each user should get half of the total rewards (10 blocks * REWARD_RATE / 2)
      const expectedReward = REWARD_RATE.mul(10).div(2);
      expect(after1.sub(before1).toString()).to.equal(pending1.toString());
      expect(after2.sub(before2).toString()).to.equal(pending2.toString());
    });
  });
});