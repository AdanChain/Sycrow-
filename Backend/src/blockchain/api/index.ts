import { blockchainHandler } from "./handleEvent";

export const initHandler = async () => {
    await blockchainHandler();
}

