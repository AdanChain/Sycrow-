import { ethers } from "ethers";

import addresses from "./abis/addresses.json";
import FarmingPool from "./abis/FarmingPoolManager.json";

import { provider } from "./providers";

const FarmingPoolContract = new ethers.Contract(addresses.FarmingPoolContractAddress, FarmingPool.abi, provider);

export {
    provider,
    FarmingPoolContract
}




