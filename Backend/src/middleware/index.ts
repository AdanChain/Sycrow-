import dotenv from 'dotenv';
import { ethers } from 'ethers';
import { NextFunction } from 'express';

dotenv.config();

const adminMiddleware = async (req: any, res: any, next: NextFunction) => {
    try {
        const signature = req.headers.auth_signature;
        const message = req.headers.auth_message;

        console.log("----------------------adminMiddleware start----------------------");
        console.log("message", message);
        console.log("signature", signature);
        console.log("----------------------adminMiddleware end----------------------");

        if (!signature) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            });
        }

        const address = ethers.utils.verifyMessage(message, signature);

        if (!address) {
            return res.status(403).json({
                success: false,
                message: 'fake signature'
            });
        }

        if (address !== process.env.ADMIN_PUBLIC_KEY) {
            return res.status(403).json({
                success: false,
                message: 'You are not Admin'
            });
        }
        req.address = address;
        next();
    } catch (error) {
        return res.status(403).json({
            success: false,
            message: error.message
        });
    }
}

export { adminMiddleware };