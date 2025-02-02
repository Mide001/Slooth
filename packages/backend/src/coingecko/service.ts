import { Tool } from "@goat-sdk/core";
import { GetTrendingCoinsParameters } from "./parameters";

export class CoinGeckoService {
  constructor(private readonly apiKey: string) {}

  @Tool({
    description: "Get the list of trending coins from CoinGecko",
  })
  async getTrendingCoins(parameters: GetTrendingCoinsParameters) {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/search/trending?x_cg_demo_api_key=${this.apiKey}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status:" ${response.status}`);
    }

    return await response.json();
  }
}
