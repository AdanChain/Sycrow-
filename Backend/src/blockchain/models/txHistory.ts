import mongoose from "mongoose";
const Schema = mongoose.Schema;

const txHistory = new Schema({
  type: String,
  value: String
})

const txHistoryDB = mongoose.model("txHistories", txHistory);

export { txHistoryDB }
