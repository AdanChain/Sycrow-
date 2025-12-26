import { PoolService } from "../service/pool.service";

class PoolController {
    private poolService: PoolService;

    constructor() {
        this.poolService = new PoolService();
    }

    async getPools(req: any, res: any) {
        try {
            const poolList = await this.poolService.getPools();
            res.status(200).json({
                success: true,
                message: "getPools successfully!",
                data: poolList
            });
        } catch (error) {
            console.log("getPoolList error", error.message);
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async updateTokenInfo(req: any, res: any) {
        try {
            const { poolId, tokenType, data } = req.body;
            const tokenInfo = await this.poolService.updateTokenInfo(poolId, tokenType, data);
            res.status(200).json({
                success: true,
                message: "updateTokenInfo successfully!",
                data: tokenInfo
            });
        } catch (error) {
            console.log("updateTokenInfo error", error.message);
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async addTokenLogo(req: any, res: any) {
        try {
            const convertedData = req.file;
            const tokenAddress = req.body.tokenAddress;
            const tokenLogo = await this.poolService.addTokenLogo(tokenAddress, convertedData);
            res.status(200).json({
                success: true,
                message: "addTokenLogo successfully!",
                data: tokenLogo
            });
        } catch (error) {
            console.log("addTokenLogo error", error.message);
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async addLiquidityLink(req: any, res: any) {
        try {
            const { poolId, link } = req.body;
            const liquidityLink = await this.poolService.addLiquidityLink(poolId, link);
            res.status(200).json({
                success: true,
                message: "addLiquidityLink successfully!",
                data: liquidityLink
            });
        } catch (error) {
            console.log("addLiquidityLink error", error.message);
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async verifyPool(req: any, res: any) {
        try {
            const { poolId } = req.body;
            const pool = await this.poolService.verifyPool(poolId);
            res.status(200).json({
                success: true,
                message: "verifyPool successfully!",
                data: pool
            });
        } catch (error) {
            console.log("verifyPool error", error.message);
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}

export { PoolController };
