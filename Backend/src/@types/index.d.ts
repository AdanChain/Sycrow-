interface FarmingPoolConfig {
    poolId: string;
    poolOwner: string;
    startBlock: string;
    endBlock: string;
    rewardRate: string;
    lpTokenAddress: string;
    rewardTokenAddress: string;
}

interface FarmingPool {
    poolId?: string;
    poolOwner?: string;
    startBlock?: string;
    endBlock?: string;
    rewardRate?: string;
    isVerified?: boolean;
    liquidityLink?: string;
    lpToken?: {
        address: string;
        logo: string;
        name: string;
        symbol: string;
    };
    rewardToken?: {
        address: string;
        logo: string;
        name: string;
        symbol: string;
    };
    APY?: string;
}

interface Image {
    imageId: string;
    imageUrl: string;
    imageName: string;
    imageType: "rewardToken" | "lpToken" | "avatar";
}

