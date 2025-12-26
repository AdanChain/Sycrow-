import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { toast } from "react-toastify";

import { useGlobalContext } from "../context";
import { fromBigNum, toBigNum } from "../utils";
import { FarmingPoolContract, provider } from "../blockchain";
import { useEthersSigner } from "../utils/getSigner";

import TokenABIs from "../blockchain/abis/Token.json";


const useContract = () => {
    const { state, stateRef, update, updateWithFunction }: any = useGlobalContext();

    const signer = useEthersSigner();
    const account = useAccount()

    const getBlockTime = async () => {
        const latestBlock = await provider.getBlock("latest");
        const earlierBlock = await provider.getBlock(latestBlock.number - 100);

        const timeDiff = latestBlock.timestamp - earlierBlock.timestamp; // in seconds
        const blockDiff = latestBlock.number - earlierBlock.number;

        const blockTime = timeDiff / blockDiff;
        return {
            mintSpeed: blockTime,
            currentBlockNumber: latestBlock.number,
        }
    }

    const getBlockNumber = async () => {
        const blockNumber = await provider.getBlockNumber();
        return blockNumber;
    }


    const createPool = async (config: FarmingPoolConfig) => {
        try {
            const initialRewardTokenAmount = config.rewardRate * (config.endBlock - config.startBlock);
            await _allowToken(config.rewardTokenAddress, toBigNum(initialRewardTokenAmount).toString());
            const tx = await FarmingPoolContract.connect(signer).createPool(
                {
                    startBlock: config.startBlock,
                    endBlock: config.endBlock,
                    rewardRate: toBigNum(config.rewardRate).toString(),
                    rewardTokenAddress: config.rewardTokenAddress,
                    lpTokenAddress: config.lpTokenAddress,
                }
            );
            await tx.wait()
            toast.success("Pool created successfully!!!")
        } catch (error: any) {
            console.log(error.message);
        }
    }

    const stake = async (poolId: string, amount: number) => {
        try{
            const amountBigNum = toBigNum(amount);
            const pool = state.pools.find((pool: any) => pool.poolId === poolId);
            await _allowToken(pool.lpToken.address, amountBigNum.toString());
            const tx = await FarmingPoolContract.connect(signer).stake(poolId, amountBigNum.toString());
            await tx.wait()
            toast.success("Staked successfully!!!")
        } catch (error: any) {
            console.log(error.message);
            toast.error("Stake failed!");
        }
    }

    const unstake = async (poolId: string, amount: number) => {
        try{
            const amountBigNum = toBigNum(amount);
            const tx = await FarmingPoolContract.connect(signer).unstake(poolId, amountBigNum.toString());
            await tx.wait()
            toast.success("Unstaked successfully!!!")
        } catch (error: any) {
            console.log(error.message);
            toast.error("Unstake failed!");
        }
    }

    const claimReward = async (poolId: string) => {
        try{
            const tx = await FarmingPoolContract.connect(signer).claimReward(poolId);
            await tx.wait()
            toast.success("Claimed successfully!!!")
        } catch (error: any) {
            console.log(error.message);
            toast.error("Claim failed!");
        }
    }

    const getTotalStakedAmount = async (poolId: string) => {
        try{
            const totalStaked = await FarmingPoolContract.getTotalStakedAmount(poolId);
            return fromBigNum(totalStaked);
        } catch (error: any) {
            console.log(error.message);
            toast.error("Get total staked amount failed!");
        }
    }

    const getUserStakedAmount = async (poolId: string) => {
        try{
            const address = await signer?.getAddress();
            if (!address) {
                return 0;
        }
        const myStaked = await FarmingPoolContract.getUserStakedAmount(poolId, address);
        return fromBigNum(myStaked);
        } catch (error: any) {
            console.log(error.message);
            toast.error("Get user staked amount failed!");
        }
    }

    const getUserRewardDebt = async (poolId: string) => {
        try{
            const address = await signer?.getAddress();
            if (!address) {
                return 0;
            }
            const userRewardDebt = await FarmingPoolContract.getUserRewardDebt(poolId, address);
            return fromBigNum(userRewardDebt);
        } catch (error: any) {
            console.log(error.message);
            toast.error("Get user reward debt failed!");
        }
    }

    const getPoolLastRewardBlock = async (poolId: string) => {
        try{
            const lastRewardBlock = await FarmingPoolContract.getPoolLastRewardBlock(poolId);
            return parseInt(lastRewardBlock);
        } catch (error: any) {
            console.log(error.message);
            toast.error("Get pool last reward block failed!");
        }
    }

    const getAccRewardPerShare = async (poolId: string) => {
        try{
            const accRewardPerShare = await FarmingPoolContract.getAccRewardPerShare(poolId);
            return fromBigNum(accRewardPerShare);
        } catch (error: any) {
            console.log(error.message);
            toast.error("Get acc reward per share failed!");
        }
    }
    
    const _getToken = async (address: string) => {
        const token = new ethers.Contract(address, TokenABIs.abi, provider);
        return token;
    }

    const _allowToken = async (tokenAddress: any, amount: any) => {
        const token = await _getToken(tokenAddress);
        const allowance = await token.connect(signer).allowance(account.address, FarmingPoolContract.address);
        if (fromBigNum(allowance) < fromBigNum(amount)) {
            await _approveTokens(tokenAddress, amount);
        }
    }

    const _approveTokens = async (toAddress: string, amount: string) => {
        try {
            const rewardToken = await _getToken(toAddress);
            const tx = await rewardToken.connect(signer).approve(FarmingPoolContract.address, amount);
            await tx.wait()
            toast.success("Approval Successfully!!!")
        } catch (error: any) {
            toast.error("Approve failed!");
            console.log(error.message)
        }
    }


    return {
        mintSpeed: stateRef.current.mintSpeed,
        currentBlockNumber: stateRef.current.currentBlockNumber,

        stake,
        unstake,
        createPool,
        claimReward,

        getBlockTime,
        getBlockNumber,
        getUserRewardDebt,
        getUserStakedAmount,
        getTotalStakedAmount,
        getAccRewardPerShare,
        getPoolLastRewardBlock,
    }
}

export default useContract;
