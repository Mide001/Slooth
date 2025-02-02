export type Token = {
    decimals: number;
    symbol: string;
    name: string;
    chains: Record<number, { contractAddress: `0x${string}` }>;
  };
  
  export type ChainSpecificToken = {
    chainId: number;
    decimals: number;
    symbol: string;
    name: string;
    contractAddress: `0x${string}`;
  };
  
  export function getTokensForNetwork(
    chainId: number,
    tokens: Token[]
  ): ChainSpecificToken[] {
    const result: ChainSpecificToken[] = [];
  
    for (const token of tokens) {
      const chainData = token.chains[chainId];
      if (chainData) {
        result.push({
          chainId: chainId,
          decimals: token.decimals,
          symbol: token.symbol,
          name: token.name,
          contractAddress: chainData.contractAddress,
        });
      }
    }
  
    return result;
  }
  