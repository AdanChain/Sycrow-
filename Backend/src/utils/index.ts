import { ethers } from "ethers";

const toBigNum = (value: string | number, d: number = 18) => {
    return ethers.utils.parseUnits(value.toString(), d); // No need to use Number() or toFixed()
}
const fromBigNum = (value: any, d: number = 18) => {
    if (!value) return 0; // Prevents NaN errors
    return parseFloat(ethers.utils.formatUnits(value.toString(), d));
}

export { toBigNum, fromBigNum }