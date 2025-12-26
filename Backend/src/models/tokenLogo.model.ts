import mongoose from "mongoose";

const tokenLogoSchema = new mongoose.Schema({
    address: { type: String, required: true },
    logo: { type: String, required: true },
});

const tokenLogoDB = mongoose.model("tokenLogo", tokenLogoSchema);

export { tokenLogoDB };
