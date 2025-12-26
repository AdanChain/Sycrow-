# DeFi Farming Pool Platform

A decentralized farming platform that allows anyone to create and manage liquidity provider (LP) token staking pools. Users can stake LP tokens to earn reward tokens, while pool owners can customize pool parameters and extend reward periods.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

This platform consists of four main components:

1. **Smart Contracts** (`contract/`) - Solidity contracts deployed on blockchain for managing farming pools
2. **Backend** (`Backend/`) - Node.js/Express API server with MongoDB for pool metadata and blockchain event indexing
3. **Frontend** (`frontend/`) - React-based user interface for staking, unstaking, and claiming rewards
4. **Admin Panel** (`admin/`) - React-based admin interface for pool verification and management

## ✨ Features

### For Users
- **Browse Pools**: View all available farming pools with filtering and sorting options
- **Stake LP Tokens**: Deposit LP tokens into pools to start earning rewards
- **Unstake**: Withdraw staked LP tokens at any time
- **Claim Rewards**: Claim earned reward tokens on-demand
- **Pool Analytics**: View TVL (Total Value Locked), APY, and pool statistics
- **Search & Filter**: Search pools by token symbol, filter by status (active/ended), and sort by TVL/APY

### For Pool Owners
- **Create Pools**: Set up custom staking pools with:
  - LP token address
  - Reward token address
  - Start and end blocks
  - Reward rate per block
- **Extend Pools**: Add more reward tokens to extend the farming period
- **Pool Management**: Monitor pool performance and staker activity

### For Admins
- **Pool Verification**: Mark pools as verified with a badge
- **Token Information**: Update token metadata (name, symbol, logo)
- **Liquidity Links**: Add DEX liquidity links for pools
- **Token Logo Upload**: Upload and manage token logos via Cloudinary

## 🏗️ Architecture

```
┌─────────────┐
│  Frontend   │  React + TypeScript + Wagmi + RainbowKit
│  (User UI)  │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Backend   │  Express + MongoDB + Ethers.js
│   (API)     │  - Pool metadata storage
│             │  - Blockchain event indexing
│             │  - APY calculation (cron jobs)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Blockchain │  Ethereum-compatible networks
│  Contracts  │  - FarmingPoolManager.sol
│             │  - Token.sol (ERC20)
└─────────────┘
```

## 🛠️ Tech Stack

### Smart Contracts
- **Solidity** ^0.8.28
- **Hardhat** - Development framework
- **OpenZeppelin** - Security libraries
- **Ethers.js** - Blockchain interaction

### Backend
- **Node.js** + **TypeScript**
- **Express.js** - REST API server
- **MongoDB** + **Mongoose** - Database
- **Ethers.js** - Blockchain interaction
- **Socket.io** - Real-time updates
- **Node-cron** - Scheduled tasks (APY updates)
- **Cloudinary** - Image storage
- **Multer** - File upload handling

### Frontend & Admin
- **React** 18.3.1
- **TypeScript** 5.7.3
- **Wagmi** + **RainbowKit** - Web3 wallet connection
- **Viem** - Ethereum library
- **Styled Components** - CSS-in-JS styling
- **React Router** - Navigation
- **Axios** - HTTP client
- **React Toastify** - Notifications

## 📁 Project Structure

```
LP/
├── contract/                 # Smart contracts
│   ├── contracts/
│   │   ├── FarmingPoolManager.sol  # Main farming pool contract
│   │   ├── Token.sol                # ERC20 token contract
│   │   └── ERC20Mock.sol            # Mock token for testing
│   ├── scripts/
│   │   ├── deployFarmingPool.js     # Deployment script
│   │   └── deployMockTokens.js     # Mock token deployment
│   ├── test/
│   │   └── FarmingPool.test.js      # Contract tests
│   └── hardhat.config.js            # Hardhat configuration
│
├── Backend/                  # Backend API server
│   ├── src/
│   │   ├── blockchain/              # Blockchain integration
│   │   │   ├── api/                 # Event handlers
│   │   │   ├── contracts/           # Contract ABIs and providers
│   │   │   └── services/            # Blockchain services
│   │   ├── controller/              # API controllers
│   │   ├── models/                  # MongoDB models
│   │   ├── service/                 # Business logic
│   │   ├── middleware/              # Auth middleware
│   │   ├── mongodb/                 # Database connection
│   │   ├── utils/                   # Utility functions
│   │   ├── routers.ts               # API routes
│   │   └── server.ts                # Express server
│   └── package.json
│
├── frontend/                 # User-facing frontend
│   ├── src/
│   │   ├── blockchain/              # Contract ABIs and providers
│   │   ├── components/              # React components
│   │   ├── hooks/                   # Custom React hooks
│   │   ├── pages/                   # Page components
│   │   │   ├── listPoolPage/        # Pool listing page
│   │   │   └── createPoolPgae/      # Pool creation page
│   │   ├── service/                 # API service layer
│   │   ├── styles/                  # Styling and themes
│   │   └── utils/                   # Utility functions
│   └── package.json
│
└── admin/                    # Admin panel
    ├── src/
    │   ├── blockchain/              # Contract ABIs
    │   ├── components/              # React components
    │   ├── pages/
    │   │   └── listPoolPage/        # Admin pool management
    │   └── ...
    └── package.json
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** v14.x or higher
- **npm** or **yarn** or **bun**
- **MongoDB** (local or cloud instance)
- **MetaMask** or compatible Web3 wallet
- **Hardhat** (for contract development)
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd LP
   ```

2. **Install Smart Contract Dependencies**
   ```bash
   cd contract
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd ../Backend
   npm install
   # or
   bun install
   ```

4. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   # or
   bun install
   ```

5. **Install Admin Panel Dependencies**
   ```bash
   cd ../admin
   npm install
   # or
   bun install
   ```

## ⚙️ Configuration

### Smart Contracts

Create a `.env` file in the `contract/` directory:

```env
PRIVATE_KEY=your_private_key_here
HOLESKY_TESTNET_RPC_URL=https://ethereum-holesky-rpc.publicnode.com
SONIC_TESTNET_RPC_URL=https://sonic-rpc.publicnode.com
SONIC_MAINNET_RPC_URL=https://sonic-rpc.publicnode.com
```

### Backend

Create a `.env` file in the `Backend/` directory:

```env
DATABASENAME=mongodb://localhost:27017/farming-pool
# Or MongoDB Atlas connection string
# DATABASENAME=mongodb+srv://username:password@cluster.mongodb.net/dbname

# Blockchain RPC URLs
HOLESKY_TESTNET_RPC_URL=https://ethereum-holesky-rpc.publicnode.com
SONIC_TESTNET_RPC_URL=https://sonic-rpc.publicnode.com

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Contract addresses (update after deployment)
FARMING_POOL_MANAGER_ADDRESS=0x...
```

### Frontend & Admin

Update contract addresses in:
- `frontend/src/blockchain/abis/addresses.json`
- `admin/src/blockchain/abis/addresses.json`

```json
{
  "FarmingPoolManager": "0x...",
  "Token": "0x..."
}
```

Update API endpoint in:
- `frontend/src/config/index.ts`
- `admin/src/config/index.ts`

```typescript
export const API_URL = "http://localhost:5050/api";
```

## 💻 Usage

### 1. Deploy Smart Contracts

```bash
cd contract

# Compile contracts
npm run compile

# Deploy to Holesky Testnet
npm run deploy
# or
npx hardhat run scripts/deployFarmingPool.js --network holeSkyTestnet
```

After deployment, update the contract addresses in the frontend, admin, and backend configuration files.

### 2. Start Backend Server

```bash
cd Backend

# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The backend server will run on `http://localhost:5050` by default.

### 3. Start Frontend

```bash
cd frontend

# Development mode
npm start
# or
npm run dev

# Production build
npm run build
```

The frontend will be available at `http://localhost:3000`.

### 4. Start Admin Panel

```bash
cd admin

# Development mode
npm start
# or
npm run dev
```

The admin panel will be available at `http://localhost:3000` (or another port if frontend is running).

## 📡 API Documentation

### Base URL
```
http://localhost:5050/api
```

### Endpoints

#### Get All Pools
```http
GET /get-pools
```

**Response:**
```json
{
  "success": true,
  "message": "getPools successfully!",
  "data": [
    {
      "poolId": "0",
      "poolOwner": "0x...",
      "startBlock": "12345",
      "endBlock": "22345",
      "rewardRate": "1000000000000000000",
      "isVerified": false,
      "liquidityLink": "https://...",
      "lpToken": {
        "address": "0x...",
        "name": "LP Token",
        "symbol": "LP"
      },
      "rewardToken": {
        "address": "0x...",
        "name": "Reward Token",
        "symbol": "REWARD"
      },
      "APY": "150.5",
      "TVL": "1000000"
    }
  ]
}
```

#### Verify Pool (Admin Only)
```http
POST /verify-pool
Content-Type: application/json

{
  "poolId": "0"
}
```

#### Update Token Info (Admin Only)
```http
POST /update-token-info
Content-Type: application/json

{
  "poolId": "0",
  "tokenType": "lpToken", // or "rewardToken"
  "data": {
    "name": "Updated Token Name",
    "symbol": "UTN"
  }
}
```

#### Add Liquidity Link (Admin Only)
```http
POST /add-liquidity-link
Content-Type: application/json

{
  "poolId": "0",
  "link": "https://dex.com/pool/..."
}
```

#### Upload Token Logo (Admin Only)
```http
POST /add-token-logo
Content-Type: multipart/form-data

tokenAddress: "0x..."
image: <file>
```

## 🧪 Testing

### Smart Contract Tests

```bash
cd contract
npm test
```

### Backend Tests

```bash
cd Backend
npm test
npm run test:watch      # Watch mode
npm run test:coverage   # Coverage report
```

### Frontend Tests

```bash
cd frontend
npm test
```

## 🚢 Deployment

### Smart Contracts

1. Update network configuration in `hardhat.config.js`
2. Deploy to target network:
   ```bash
   npx hardhat run scripts/deployFarmingPool.js --network <network-name>
   ```
3. Verify contracts on block explorer (if supported)

### Backend

1. Set production environment variables
2. Build and start:
   ```bash
   npm start
   ```
3. Use process manager (PM2, systemd, etc.) for production

### Frontend & Admin

1. Update API URLs and contract addresses for production
2. Build:
   ```bash
   npm run build
   ```
3. Deploy `build/` folder to hosting service (Vercel, Netlify, etc.)

## 🔐 Security Considerations

- **Smart Contracts**: Audited by security experts before mainnet deployment
- **Private Keys**: Never commit private keys to version control
- **Environment Variables**: Use secure secret management
- **Access Control**: Admin endpoints should be protected with authentication
- **Reentrancy Protection**: Contracts use OpenZeppelin's ReentrancyGuard

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **OpenZeppelin** - Secure smart contract libraries
- **Hardhat** - Ethereum development environment
- **RainbowKit** - Web3 wallet connection UI
- **Wagmi** - React Hooks for Ethereum

## 📞 Support

For issues, questions, or contributions, please open an issue on the GitHub repository.

---

**Note**: This is a DeFi application. Always test thoroughly on testnets before deploying to mainnet. Use at your own risk.

