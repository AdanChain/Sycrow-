const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    // Compile and deploy the contract
    const Token = await ethers.getContractFactory("Token");
    const totalSupply = ethers.utils.parseUnits("3000000", 18); // 1 million tokens with 18 decimals
    const token = await Token.deploy("RewardToken", "RWT", 18, totalSupply);

    console.log("Token contract deployed to:", token.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
