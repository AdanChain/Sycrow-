import path from "path";
import multer from "multer";
import express from "express";
import { adminMiddleware } from "./middleware";
import { PoolController } from "./controller/pool.controller";

const poolController = new PoolController();

const routers = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./src/assets"); // Save files in 'uploads' folder
    },
    filename: (req, file, cb) => {
        const nameWithoutExtension = path.parse(file.originalname).name;
        cb(null, nameWithoutExtension);
    },
});

const upload = multer({ storage });

// farming pool
routers.get("/get-pools", poolController.getPools.bind(poolController));
routers.post("/verify-pool", poolController.verifyPool.bind(poolController));
routers.post("/update-token-info", poolController.updateTokenInfo.bind(poolController));
routers.post("/add-liquidity-link", poolController.addLiquidityLink.bind(poolController));
routers.post("/add-token-logo", upload.single("image"), poolController.addTokenLogo.bind(poolController));

export default routers;

