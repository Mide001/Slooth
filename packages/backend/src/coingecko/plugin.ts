import { PluginBase } from "@goat-sdk/core";
import { CoinGeckoService } from "./service";

interface CoinGeckoPluginOptions {
  apiKey: string;
}

export class CoinGeckoPlugin extends PluginBase {
  constructor({ apiKey }: CoinGeckoPluginOptions) {
    super("coingecko", [new CoinGeckoService(apiKey)]);
  }

  supportsChain = () => true;
}

export function coingecko(options: CoinGeckoPluginOptions) {
  return new CoinGeckoPlugin(options);
}
