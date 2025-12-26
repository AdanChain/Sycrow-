import { ethers } from "ethers";
import { fromBigNum } from "../../utils";
import { provider, AdminWallet, getPairContact, FarmingPoolContract, getTokenContract } from "../contracts";


class BlockchainService {

    async getLpTokenInfo(lpTokenAddress: string) {
        try {
            const pairContract = await getPairContact(lpTokenAddress)

            const token0 = await pairContract.token0()
            const token1 = await pairContract.token1()
            const symbol = await pairContract.symbol()

            const [reserve0, reserve1] = await pairContract.getReserves();
            const totalSupply = await pairContract.totalSupply();
            
            return {
                token0 : token0,
                token1 : token1,
                symbol : symbol,
                reserve0 : fromBigNum(reserve0).toString(),
                reserve1 : fromBigNum(reserve1).toString(),
                totalSupply : fromBigNum(totalSupply).toString()
            }
        } catch (error: any) {
            console.log("error", error.message)
        }
    }

    async getTokenInfo(tokenAddress : string) {
        try{
            const tokenContract = await getTokenContract(tokenAddress)
            const name = await tokenContract.name()
            const symbol = await tokenContract.symbol()

            return {
                name,
                symbol,
            }

        } catch (err) {
            console.log("error", err.message)
        }
    }

    async getStakeAmount  (poolId : string) {
        const amount = await FarmingPoolContract.getTotalStakedAmount(poolId)
        return fromBigNum(amount);
    }

    async getBlockTime () {
        const latestBlock = await provider.getBlock("latest");
        const earlierBlock = await provider.getBlock(latestBlock.number - 100);

        const timeDiff = latestBlock.timestamp - earlierBlock.timestamp; // in seconds
        const blockDiff = latestBlock.number - earlierBlock.number;

        const blockTime = timeDiff / blockDiff;
        
        return blockTime.toFixed(3)
    }

    async getBlockNumber () {
        const blockNumber = await provider.getBlockNumber();
        return blockNumber;
    }

}


export { BlockchainService };

