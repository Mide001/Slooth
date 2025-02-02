import { createToolParameters } from "@goat-sdk/core";
import { z } from "zod";

export class GetTrendingCoinsParameters extends createToolParameters(
  z.object({
    limit: z
      .number()
      .optional()
      .describe(
        "The number of trending coins to return. Default to all coins."
      ),
    include_platform: z
      .boolean()
      .optional()
      .describe(
        "Include platform contract address (e.g., ETH, BSC) in response"
      ),
  })
) {}
