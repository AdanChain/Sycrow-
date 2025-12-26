import axios from "axios";

const serverUrl = "http://localhost:5050/api"

const poolService = {
    getPools: async () => {
        const pools = await axios.get(`${serverUrl}/get-pools`);
        return pools.data.data;
    },

    updateTokenInfo: async (poolId: string, tokenType: TokenType, data: any) => {
        const tokenInfo = await axios.post(`${serverUrl}/update-token-info`, {
            poolId,
            tokenType,
            data
        });
        return tokenInfo.data.data;
    },

    addTokenLogo: async (image: FormData) => {
        const tokenInfo = await axios.post(`${serverUrl}/add-token-logo`, image);
        return tokenInfo.data.data;
    },

    addLiquidityLink: async (poolId: number, link: string) => {
        const liquidityLink = await axios.post(`${serverUrl}/add-liquidity-link`, {
            poolId,
            link
        });
        return liquidityLink.data.data;
    },

    verifyPool: async (poolId: number) => {
        const verifyPool = await axios.post(`${serverUrl}/verify-pool`, {
            poolId,
        });
        return verifyPool.data.data;
    }
}

export default poolService;
