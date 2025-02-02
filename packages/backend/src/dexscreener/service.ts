import { Tool } from "@goat-sdk/core";
import {
  GetPairsByChainAndPairParameters,
  GetTokenPairsParameters,
  SearchPairsParameters,
  TokenInfoQueryParams,
} from "./parameters";

interface ExtractedTokenData {
  dex: string;
  pairName: string;
  pairAddress: string;
  priceUsd: string;
  volume24h: number;
  marketCap: number;
  pairCreatedAt: string;
  socials: {
    websites: string[];
    socialLinks: string[];
  };
}

export class DexscreenerService {
  private readonly baseUrl = "https://api.dexscreener.com/latest/dex";
  private readonly tokenBaseUrl = "https://api.dexscreener.com/tokens/v1";

  private async fetchDexscreener(url: string, action: string) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP status ${response.status}`);
      }
      const data = await response.json();
      console.log("Token Details: ", data);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to ${action}: ${error.message}`);
      }
      throw new Error(`Failed to ${action}: Unknown error`);
    }
  }

  private extractTokenData(data: any[]): ExtractedTokenData {
    if (!data || !Array.isArray(data) || data.length === 0) {
      throw new Error("Invalid data format received");
    }

    const tokenData = data[0];
    const extracted = {
      dex: tokenData.dexId,
      pairName: `${tokenData.baseToken.symbol}/${tokenData.quoteToken.symbol}`,
      pairAddress: tokenData.pairAddress,
      priceUsd: `$${Number(tokenData.priceUsd).toFixed(6)}`,
      volume24h: tokenData.volume.h24,
      marketCap: tokenData.marketCap,
      pairCreatedAt: new Date(tokenData.pairCreatedAt).toISOString(),
      socials: {
        websites: tokenData.info?.websites || [],
        socialLinks: tokenData.info?.socials || [],
      },
    };

    console.log("Data Format: ", extracted);
    return extracted;
  }

  @Tool({
    description: "Fetch pairs by chainId and pairId from Dexscreener",
  })
  async getPairsByChainAndPair(parameters: GetPairsByChainAndPairParameters) {
    const url = `${this.baseUrl}/pairs/${parameters.chainId}/${parameters.pairId}`;
    return this.fetchDexscreener(url, "fetch pairs");
  }

  @Tool({
    description: "Search for DEX pairs matching a query string on Dexscreener",
  })
  async searchPairs(parameters: SearchPairsParameters) {
    const url = `${this.baseUrl}/search?q=${encodeURIComponent(
      parameters.query
    )}`;
    return this.fetchDexscreener(url, "search pairs");
  }

  @Tool({
    description:
      "Get all DEX pairs for given token addresses (up to 30) from Dexscreener",
  })
  async get_token_pairs_by_token_address(parameters: GetTokenPairsParameters) {
    if (parameters.tokenAddresses.length > 30) {
      throw new Error("Maximum of 30 token addresses allowed per request");
    }
    const addresses = parameters.tokenAddresses.join(",");
    const url = `${this.baseUrl}/tokens/${addresses}`;
    return this.fetchDexscreener(url, "get token pairs");
  }

  @Tool({
    description: "Get detailed analysis for a token address from dexscreener",
  })
  async fetchTokenDetails(
    parameters: TokenInfoQueryParams
  ): Promise<ExtractedTokenData> {
    const url = `${this.tokenBaseUrl}/mode/${parameters.tokenAddress}`;
    console.log("Url: ", url);
    const rawData = await this.fetchDexscreener(url, "fetch token");
    return this.extractTokenData(rawData);
  }
}
