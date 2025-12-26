import { ethers } from "ethers";
import { Provider, setMulticallAddress } from "ethers-multicall";
import FarmingPool from "./abis/FarmingPoolManager.json";
import DEXPair from "./abis/DEXPair.json"
import ERC20 from "./abis/Token.json"
import addresses from "./abis/addresses.json";

import { provider } from "./providers";
import dotenv from "dotenv";

dotenv.config();

// const NFTCardContract = new ethers.Contract(addresses.NFTCardContractAddress, NFTCard.abi, provider);
const AdminWallet = new ethers.Wallet(process.env.ADMIN_PRIVATE_KEY, provider);
const FarmingPoolContract = new ethers.Contract(addresses.FarmingPoolContractAddress, FarmingPool.abi, provider);

const getPairContact = async (address: string) => {
    const pairContract = new ethers.Contract(address, DEXPair.abi, provider)
    return pairContract
}

const getTokenContract = async (address: string) => {
    const tokenContract = new ethers.Contract(address, ERC20.abi, provider)
    return tokenContract
}

export {
    provider,
    AdminWallet,
    FarmingPoolContract,
    getPairContact,
    getTokenContract
}




