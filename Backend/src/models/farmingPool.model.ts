import { Schema, model } from "mongoose";

const lpTokenSchema = new Schema({
    address: { type: String, require: true },
    name: { type: String },
    symbol: { type: String },
});

const rewardTokenSchema = new Schema({
    address: { type: String, require: true },
    name: { type: String },
    symbol: { type: String },
});


const farmingPoolSchema = new Schema({
    poolId: { type: String, required: true },
    poolOwner: { type: String, required: true },
    startBlock: { type: String, required: true },
    endBlock: { type: String, required: true },
    rewardRate: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    liquidityLink: { type: String },
    lpToken: { type: lpTokenSchema, required: true },
    rewardToken: { type: rewardTokenSchema, required: true },
    APY: { type: String },
    TVL: { type: String }
});

const farmingPoolDB = model("farmingPool", farmingPoolSchema);

export { farmingPoolDB };

