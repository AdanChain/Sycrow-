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

    const getBlockNumber = async () => {
        const blockNumber = await provider.getBlockNumber();
        return blockNumber;
    }



    return {
        currentBlockNumber: stateRef.current.currentBlockNumber,

        getBlockNumber,
    }
}

export default useContract;
