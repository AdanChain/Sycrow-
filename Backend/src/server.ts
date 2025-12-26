import cors from "cors";
import dotenv from "dotenv";
import colors from "colors";
import cron from "node-cron";
import express from "express";
import bodyParser from "body-parser";

import router from "./routers";
import dbConnect from "./mongodb";
import { initHandler } from "./blockchain/api";
import { PoolService } from "./service/pool.service";

const poolService = new PoolService();

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors({ 
    origin: "*",
    credentials: true,
}));

// Initialize server asynchronously
async function initializeServer() {
    try {
        const port = 5050;
        await dbConnect(process.env.DATABASENAME);
        initHandler();
        app.use("/api", router);

        const server = app.listen(port, () => {
            console.log("Server is running on port :: ", colors.green(`${port}`));
        });

        cron.schedule(`*/${100} * * * * *`, async () => {
            await poolService.updateAPY();
        });
    } catch (error) {
        console.error("Failed to initialize server:", error);
        process.exit(1);
    }
}

initializeServer();

