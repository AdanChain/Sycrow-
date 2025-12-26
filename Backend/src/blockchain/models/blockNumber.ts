import mongoose from "mongoose";
const Schema = mongoose.Schema;

const blockNumber = new Schema({
  id: { type: String, required: true },
  latestBlock: { type: Number, required: true }
})


const blockNumberDB = mongoose.model("blockNumbers", blockNumber);

export { blockNumberDB }
