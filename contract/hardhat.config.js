/** @type import('hardhat/config').HardhatUserConfig */
require("dotenv").config();
require("@nomiclabs/hardhat-ethers");
// require("@nomiclabs/hardhat-waffle");
// require("@nomiclabs/hardhat-etherscan");

// Ensure environment variables are properly loaded with fallbacks
const HOLESKY_TESTNET_RPC_URL = process.env.HOLESKY_TESTNET_RPC_URL || "https://ethereum-holesky-rpc.publicnode.com";
const SONIC_TESTNET_RPC_URL = process.env.SONIC_TESTNET_RPC_URL || "https://sonic-rpc.publicnode.com";
const SONIC_MAINNET_RPC_URL = process.env.SONIC_MAINNET_RPC_URL || "https://sonic-rpc.publicnode.com";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";

module.exports = {
  solidity: "0.8.28",
  networks: {
    // holeSky testnet
    holeSkyTestnet: {
      url: HOLESKY_TESTNET_RPC_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },

    sonicTestnet: {
      url: SONIC_TESTNET_RPC_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },

    sonicMainnet: {
      url: SONIC_MAINNET_RPC_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
  },
};
