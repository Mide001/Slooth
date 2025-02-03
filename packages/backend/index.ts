import express, { Request, Response, Application } from "express";
import cors from "cors";
import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { mode } from "viem/chains";
import { getOnChainTools } from "@goat-sdk/adapter-vercel-ai";
import { USDC } from "@goat-sdk/plugin-erc20";
import { viem } from "@goat-sdk/wallet-viem";
import { dexscreener } from "./src/dexscreener";
import { coingecko } from "./src/coingecko";
import { erc20 } from "./src/erc20";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();
app.use(cors());
app.use(express.json());

// Initialize wallet client
const account = privateKeyToAccount(
  process.env.WALLET_PRIVATE_KEY as `0x${string}`
);

const walletClient = createWalletClient({
  account: account,
  transport: http(process.env.RPC_PROVIDER_URL),
  chain: mode,
});

// Initialize tools
let tools: Awaited<ReturnType<typeof getOnChainTools>>;

async function initializeTools() {
  tools = await getOnChainTools({
    wallet: viem(walletClient),
    plugins: [
      erc20({
        tokens: [
          USDC,
        ],
      }),
      dexscreener(),
      coingecko({ apiKey: process.env.COINGECKO_API_KEY || "" }),
    ],
  });
}

// Initialize tools when server starts
initializeTools().catch(console.error);

// Define interface for the request body
interface ChatRequest {
  prompt: string;
}

app.post(
  "/api/chat",
  async (req: Request<{}, any, ChatRequest>, res: Response): Promise<void> => {
    try {
      const { prompt } = req.body;

      if (!prompt) {
        res.status(400).json({ error: "Prompt is required" });
        return;
      }

      const result = await generateText({
        model: openai("gpt-4o-mini"),
        tools: tools,
        maxSteps: 10,
        prompt: prompt,
        onStepFinish: (event) => {
          console.log(event.toolResults);
        },
      });

      res.json({ text: result.text });
    } catch (error) {
      console.error("Error processing request:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
