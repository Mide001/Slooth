export enum ChainId {
  ETHEREUM = "1",
  ARBITRUM = "42161",
  OPTIMISM = "10",
  BASE = "8453",
  BSC = "56",
  POLYGON = "137",
  AVALANCHE = "43114",
}

export const chainIdToName: Record<ChainId, string> = {
  [ChainId.ETHEREUM]: "ethereum",
  [ChainId.ARBITRUM]: "arbitrum",
  [ChainId.OPTIMISM]: "optimism",
  [ChainId.BASE]: "base",
  [ChainId.BSC]: "bsc",
  [ChainId.POLYGON]: "polygon",
  [ChainId.AVALANCHE]: "avalanche",
};
