import { config } from "../config";

import axios from "axios";

const poolService = {   
    getPools: async () => {
        const pools = await axios.get(`${config.serverUrl}/get-pools`);
        return pools.data.data;
    }
}

export default poolService;
