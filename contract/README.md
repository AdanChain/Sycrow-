# Public Farming Platform

A decentralized platform where anyone can set up and run their own token staking pools.

## Overview

This platform allows project owners to create staking pools where users can stake LP tokens and earn reward tokens. Project owners can customize pool parameters, including LP token address, reward token address, reward amount, and duration.

## Key Features

- **Pool Creation**: Project owners can create staking pools with custom parameters.
- **Staking**: Users can stake LP tokens to earn rewards.
- **Reward Claiming**: Users can claim earned rewards at any time.
- **Pool Extensions**: Pool owners can extend reward periods by adding more tokens.
- **Unstaking**: Users can unstake their LP tokens whenever they want.
- **Analytics**: Basic pool statistics including TVL, stakers, etc.
- **Verification**: Admins can mark pools as "verified" with a badge.

## Project Structure

### Smart Contracts

- **FarmingPool.sol**: The main contract that handles staking, rewards distribution, and pool management.
- **FarmingPoolFactory.sol**: Factory contract for creating and tracking instances of FarmingPool.
- **MockToken.sol**: A sample ERC20 token for testing purposes.

### Frontend

- React-based UI with Hero UI components
- Web3 integration for connecting to blockchain
- Full pool management interface

## Getting Started

### Prerequisites

- Node.js (v14.x or higher)
- npm or yarn
- Hardhat
- MetaMask wallet

### Installation

#### Smart Contracts

1. Clone the repository
   ```
   git clone https://github.com/yourusername/farming-pool.git
   cd farming-pool
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   PRIVATE_KEY=your_private_key
   HOLESKY_TESTNET_RPC_URL=your_rpc_url
   ```

4. Compile contracts
   ```
   npx hardhat compile
   ```

5. Deploy contracts
   ```
   npx hardhat run scripts/deploy.js --network holeSkyTestnet
   ```

#### Frontend

1. Navigate to the frontend directory
   ```
   cd frontend
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Update the contract addresses in `src/config.js` with your deployed contract addresses.

4. Start the development server
   ```
   npm start
   ```

## Testing

### Smart Contract Tests

```
npx hardhat test
```

### Frontend Tests

```
cd frontend
npm test
```

## Deployment

### Smart Contracts

Deploy to Holesky Testnet:
```
npx hardhat run scripts/deploy.js --network holeSkyTestnet
```

### Frontend

Build the frontend for production:
```
cd frontend
npm run build
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- OpenZeppelin for their secure contract libraries
- Hero UI for frontend components 