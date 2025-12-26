import fs from "fs";
import path from "path";
import { uploadImage } from "../utils/imgUploader";
import { getTokenPrice } from "../utils/getTokenPrice";
import { BlockchainService } from "../blockchain/services";
import { farmingPoolDB } from "../models/farmingPool.model";
import { tokenLogoDB } from "../models/tokenLogo.model";


class PoolService {
    private blockchainService: BlockchainService;

    constructor() {
        this.blockchainService = new BlockchainService();
    }

    async createPool({ poolId, poolOwner, startBlock, endBlock, rewardRate, lpToken, rewardToken }: any) {
        const pool = await farmingPoolDB.findOne({ poolId })
        
        if (pool) {
            return
        }

        const newPool = new farmingPoolDB({
            poolId,
            poolOwner,
            startBlock,
            endBlock,
            rewardRate,
            lpToken,
            rewardToken
        })

        await newPool.save();
    }

    async getPools() {
        const pools = await farmingPoolDB.find();
        const newPools = await Promise.all(pools.map(async (pool) => {
            const lpTokenLogo = await tokenLogoDB.findOne({ address: pool.lpToken.address });
            const rewardTokenLogo = await tokenLogoDB.findOne({ address: pool.rewardToken.address });
            const plainPool = pool.toObject();
            return {
                ...plainPool,
                lpToken: {
                    ...plainPool.lpToken,
                    logo: lpTokenLogo?.logo
                },
                rewardToken: {
                    ...plainPool.rewardToken,
                    logo: rewardTokenLogo?.logo
                }
            }
        }));

        return newPools;
    }

    async addLiquidityLink(poolId: string, liquidityLink: string) {
        const pool = await farmingPoolDB.findOneAndUpdate({ poolId }, { liquidityLink });
        return pool;
    }

    async updateTokenInfo(poolId: string, tokenType: string, data: any) {

        const pool = await farmingPoolDB.findOneAndUpdate({ poolId }, { [`${tokenType}.name`]: data.name });
        return pool;
    }

    async addTokenLogo(tokenAddress: string, data: any) {
        const uploadResult = await uploadImage(data.path, data.originalname);
        const filePath = path.resolve(__dirname, "../assets", data.filename);
        fs.unlinkSync(filePath);

        const tokenLogo = await tokenLogoDB.findOne({ address: tokenAddress });
        if (tokenLogo) {
            await tokenLogoDB.findOneAndUpdate({ address: tokenAddress }, { logo: uploadResult });
        } else {
            const newTokenLogo = new tokenLogoDB({
                address: tokenAddress,
                logo: uploadResult
            })
            await newTokenLogo.save();
        }
        return uploadResult;
    }

    async verifyPool(poolId: string) {
        const pool = await farmingPoolDB.findOneAndUpdate({ poolId }, { isVerified: true });
        return pool;
    }

    async updateAPY() {
        const pools = await farmingPoolDB.find();
        const blockNumber = await this.blockchainService.getBlockNumber();
        Promise.all(pools.map(async (pool) => {
            if (blockNumber < parseInt(pool.endBlock)) {
                await this._calculateAPY(pool.poolId)
            }
        }))
    }

    async _calculateAPY(poolId: string) {
        try {
            const stakeAmount: any = await this.blockchainService.getStakeAmount(poolId);

            if (!stakeAmount) {
                await farmingPoolDB.findOneAndUpdate({ poolId }, { APY: 0, TVL: 0 });
                return
            }
            const pool: any = await farmingPoolDB.findOne({ poolId })
            const lpTokenAddress: string = pool?.lpToken?.address
            const rewardTokenAddress: string = pool?.rewardToken?.address

            const { token0, token1, reserve0, reserve1, totalSupply }: any = await this.blockchainService.getLpTokenInfo(lpTokenAddress)

            const price0: any = await getTokenPrice(token0);
            const price1: any = await getTokenPrice(token1);
            const lpTokenPrice = (reserve0 * price0 + reserve1 * price1) / totalSupply
            const blockTime: any = await this.blockchainService.getBlockTime()
            const averageBlocksPerYear = Math.floor(365 * 24 * 3600 / blockTime) // average rewardTokenAmount per year

            const rewardTokenPrice: any = await getTokenPrice(rewardTokenAddress);

            const apy = (rewardTokenPrice * pool.rewardRate * averageBlocksPerYear) / (lpTokenPrice * stakeAmount) * 100
            await farmingPoolDB.findOneAndUpdate({ poolId }, { APY: apy, TVL: lpTokenPrice * stakeAmount });
        } catch (err) {
            console.log("error", err.message)
        }

    }

}

export { PoolService };
