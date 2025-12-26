interface FarmingPoolConfig {
    startBlock: number;
    endBlock: number;
    rewardRate: number;
    rewardTokenAddress: string;
    lpTokenAddress: string;
}

interface TokenType {
    type : 'lpToken' | 'rewardToken'
}


interface Image {
    imageId: string;
    imageUrl: string;
    imageName: string;
    imageType: "rewardToken" | "lpToken" | "avatar";
}

interface Staked {
    poolId: number;
    staked: number;
}

interface EndDate {
    poolId: number;
    endDate: string;
}

