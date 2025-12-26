import { timeStamp } from "console";
import { useGlobalContext } from "../context";
import poolService from "../service/pool.service";
const usePool = () => {
    const { state, update, updateWithFunction }: any = useGlobalContext();

    const getPools = async () => {
        try {
            const pools = await poolService.getPools();
            update({
                pools
            })
        } catch (error) {
            console.log(error);
        }
    }

    const getCurrentDateTime = () => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const year = now.getFullYear();
        const currentDateTime = {
            date: `${year}-${month}-${day}`,
            time: `${hours}:${minutes}:${seconds}`,
            timestamp: now.getTime()
        };

        update({
            currentDateTime
        });
    };

    return {
        pools: state.pools,
        currentDateTime: state.currentDateTime,
        getPools,
        getCurrentDateTime
    }
}

export default usePool;
