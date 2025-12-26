import colors from "colors";
import { v4 as uuidv4 } from 'uuid';
import { blockNumberDA } from "../data-access";
import { handleEvent } from "../../utils/blockHandler";
import {  provider, FarmingPoolContract } from "../contracts";
import { PoolService } from "../../service/pool.service";
import { fromBigNum } from "../../utils";
import { BlockchainService } from "../services";

interface BaseParams {
    times: number;
    provider: any;
    blockNumController: any;
}

const blockchainHandler = () => {
    const poolService = new PoolService();
    const blockchainService = new BlockchainService();

    const createFarmingPoolHandler = async (tx: any, id: string) => {
        try {
            let txData: FarmingPoolConfig = {
                poolId: (Number(tx.args.poolId) - 1).toString(),
                poolOwner: tx.args.poolOwner,
                startBlock: tx.args.startBlock.toString(),
                endBlock: tx.args.endBlock.toString(),
                rewardRate: fromBigNum(tx.args.rewardRate).toString(),
                lpTokenAddress: tx.args.lpTokenAddress,
                rewardTokenAddress: tx.args.rewardTokenAddress,
            }

            const rewardTokenInfo = await blockchainService.getTokenInfo(txData.rewardTokenAddress)
            const lpTokenInfo = await blockchainService.getLpTokenInfo(txData.lpTokenAddress)
            const { token0, token1, symbol } = lpTokenInfo;
            const token0Info = await blockchainService.getTokenInfo(token0)
            const token1Info = await blockchainService.getTokenInfo(token1)
            const lpTokenSymbol = symbol
            const lpTokenName = `${token0Info.name}/${token1Info.name}`

            const createPoolData = {
                poolId: (Number(tx.args.poolId) - 1).toString(),
                poolOwner: tx.args.poolOwner,
                startBlock: tx.args.startBlock.toString(),
                endBlock: tx.args.endBlock.toString(),
                rewardRate: fromBigNum(tx.args.rewardRate).toString(),
                lpToken: {
                    address: tx.args.lpTokenAddress,
                    symbol: lpTokenSymbol,
                    name: lpTokenName
                },
                rewardToken: {
                    address: tx.args.rewardTokenAddress,
                    symbol: rewardTokenInfo.symbol,
                    name: rewardTokenInfo.name
                },
                APY : 0,
                TVL : 0,
            }

            console.log("createPoolData", {
                createPoolData
            })
            await poolService.createPool(createPoolData);

        } catch (error) {
            console.error(error.message);
        }

    }

    const handleStart = async () => {
        const params: BaseParams = {
            times: 12,
            provider: provider,
            blockNumController: blockNumberDA
        }
        //make NFTCardHandler
        handleEvent({
            ...params,
            id: "createFarmingPool",
            contract: FarmingPoolContract,
            event: "PoolCreated",
            handler: createFarmingPoolHandler
        })
    }

    handleStart();

}

export { blockchainHandler };
