const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    // Compile and deploy the contract
    const FarmingPoolManager = await ethers.getContractFactory("FarmingPoolManager");
    const farmingPoolManager = await FarmingPoolManager.deploy();

    console.log("FarmingPoolManager contract deployed to:", farmingPoolManager.address);
}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
