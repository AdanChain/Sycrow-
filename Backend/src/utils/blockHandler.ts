import colors from "colors"
import cron from "node-cron"
import { blockNumberDA } from "../blockchain/data-access";

export const handleEvent = async (props: blockEventObject) => {
  const { id, provider, contract, event, times, handler, blockNumController } = props;
  console.log("handleEvent");
  let latestBlockNumber: number;
  const handletransactions = async () => {
    if (!latestBlockNumber) return;


    try {
      let latestBlock = Number(latestBlockNumber)
      let blockNumber = await provider.getBlockNumber();


      if (blockNumber > latestBlock) {
        blockNumber = (blockNumber > latestBlock + 1000) ? (latestBlock + 1000) : blockNumber;

        let txHistory = contract.queryFilter(
          event,
          latestBlock + 1,
          blockNumber
        );

        await txHistory.then(async (res: any) => {
          for (let index in res) {
            handler(res[index], id);
          }
        });

        latestBlockNumber = blockNumber;
        await blockNumberDA.update({
          filter: { id: id },
          data: { latestBlock: blockNumber }
        }
        );

      }
    } catch (err) {
      if (err.reason === "missing response") {
        console.log(colors.red("you seem offline"));
      } else {
        console.log("handleEvent err ", event, err.reason);
      }
    }
  };

  const handleEvent = async () => {
    let blockNumber: number;

    try {
      blockNumber = (await blockNumberDA.findOne({
        filter: { id: id }
      })).latestBlock;

      if (!blockNumber) throw new Error("not find");
    } catch (err) {
      blockNumber = await provider.getBlockNumber();
      await blockNumberDA.create({
        id: id,
        latestBlock: blockNumber,
      });
      console.log("handleEvent err", err);
    }

    latestBlockNumber = blockNumber;
    cron.schedule(`*/${times} * * * * *`, () => {
      // console.log(`running a transaction handle every ${times} second`);
      handletransactions();
    });

  };

  handleEvent();
};
