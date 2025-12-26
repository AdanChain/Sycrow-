import { useGlobalContext } from "../context";
import poolService from "../service/pool.service";
import { useEthersSigner } from "../utils/getSigner";

// Define the TokenType type that's used in the updateTokenInfo function

const usePool = () => {

    const signer = useEthersSigner();
    const { state, update, updateWithFunction }: any = useGlobalContext();

    const getPools = async () => {
        try {
            const pools = await poolService.getPools();
            console.log(pools);
            update({
                pools
            })
        } catch (error) {
            console.log(error);
        }
    }

    const updateTokenInfo = async (poolId: string, tokenType: TokenType, data: any) => {
        try {
            const tokenInfo = await poolService.updateTokenInfo(poolId, tokenType, data);
            return tokenInfo;
        } catch (error) {
            console.log(error);
        }
    }

    const addTokenLogo = async (image: FormData) => {
        try {
            const tokenInfo = await poolService.addTokenLogo(image);
            return tokenInfo;
        } catch (error) {
            console.log(error);
        }
    }   

    const addLiquidityLink = async (poolId: number, link: string) => {
        try {
            const liquidityLink = await poolService.addLiquidityLink(poolId, link);
            update({
                liquidityLink
            })
        } catch (error) {
            console.log(error);
        }
    }

    const verifyPool = async (poolId: number) => {
        try {
            await signer?.signMessage(poolId.toString());
            const verifyPool = await poolService.verifyPool(poolId);
            update({
                verifyPool
            })
        } catch (error) {
            console.log(error);
        }
    }

    return {
        pools: state.pools,

        getPools,
        verifyPool,
        addTokenLogo,
        updateTokenInfo,
        addLiquidityLink,
    }
}

export default usePool;
