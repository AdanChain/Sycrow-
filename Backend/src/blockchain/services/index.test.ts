
import { BlockchainService } from "."

describe('lpTokenContract test', () => {
    it('get lpTokneInfo with lpTokenInfo should be success', async () => {
        try {
            const lpTokenAddress = "0x24E08246a1E3CE9F4B8Df5B839d804760D556aE3"
            const blockchainService = new BlockchainService();

            const lptokeninfo = await blockchainService.getLpTokenInfo(lpTokenAddress)
        } catch (error) {
            const lpTokenAddress = "0x24E08246a1E3CE9F4B8Df5B839d804760D556aE3"
            const blockchainService = new BlockchainService();
            const lptokeninfo = await blockchainService.getLpTokenInfo(lpTokenAddress)
        }
    })

    it("getTokenInfo", async () => {
        const tokenAddress = "0x35Cac80b70eB858e54E7c71252946C7faC1bD9a6"
        const blockchainService = new BlockchainService();
        const tokenInfo = await blockchainService.getTokenInfo(tokenAddress)
        console.log("tokenInfo", tokenInfo)
    })
})