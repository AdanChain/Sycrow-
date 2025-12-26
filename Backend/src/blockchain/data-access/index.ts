import { blockNumberDB, txHistoryDB } from "../models";
import DataAccess from "./basic";

const blockNumberDA = new DataAccess(blockNumberDB);
const txHistoryDA = new DataAccess(txHistoryDB);

export { blockNumberDA, txHistoryDA };

