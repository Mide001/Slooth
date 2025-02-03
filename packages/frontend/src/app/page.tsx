import { AIAgentInterface } from "@/components/ai-interface";
import {
  Bot,
  LineChart,
  Shuffle,
  Search,
  TrendingUp,
  Copy,
  Target,
} from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[rgb(var(--background))]">
      <div className="w-full border-b border-primary/20">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col items-center text-center mb-12">
            <div className="flex items-center justify-center w-20 h-20 bg-primary rounded-full mb-4 shadow-[0_0_30px_rgba(var(--primary),0.3)]">
              <Bot className="w-10 h-10 text-[rgb(var(--primary-foreground))]" />
            </div>
            <h1 className="text-6xl font-bold text-primary mb-2">Slooth</h1>
            <p className="text-xl text-[rgb(var(--text-secondary))] mt-2 max-w-2xl">
              Your AI-Powered Crypto Research & Trading Agent
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Feature cards using CSS variables */}
            <FeatureCard
              icon={<Search className="w-6 h-6" />}
              title="Token Analysis"
              description="Deep dive into token metrics, market trends, and risk analysis with real-time data"
            />
            <FeatureCard
              icon={<Shuffle className="w-6 h-6" />}
              title="Smart Swaps"
              description="Get optimal swap routes and timing suggestions based on market conditions"
            />
            <FeatureCard
              icon={<Copy className="w-6 h-6" />}
              title="Copy Trading"
              description="Track and analyze successful traders' performance for informed copy trading"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <InfoCard
              icon={<LineChart className="w-5 h-5" />}
              title="Performance Tracking"
              items={[
                "Historical trading analysis",
                "Profit/loss calculations",
                "Risk metrics assessment",
              ]}
            />
            <InfoCard
              icon={<TrendingUp className="w-5 h-5" />}
              title="Market Intelligence"
              items={[
                "Real-time market analysis",
                "Sentiment tracking",
                "Trend prediction",
              ]}
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <AIAgentInterface title="Ask Slooth" />
      </div>
    </main>
  );
}

// Component for feature cards
const FeatureCard = ({ 
  icon, 
  title, 
  description 
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="flex items-start p-6 bg-[rgb(var(--background))] border border-primary/20 rounded-lg hover:border-primary/40 transition-all">
    <div className="icon-container w-12 h-12 bg-primary mr-4">
  <div className="text-[rgb(var(--primary-foreground))]">{icon}</div>
</div>
    <div>
      <h3 className="font-semibold text-primary text-lg mb-2">{title}</h3>
      <p className="text-sm text-[rgb(var(--text-secondary))]">{description}</p>
    </div>
  </div>
);

// Component for info cards
const InfoCard = ({ 
  icon, 
  title, 
  items 
}: {
  icon: React.ReactNode;
  title: string; 
  items: string[];
}) => (
  <div className="p-6 bg-[rgb(var(--background))] border border-primary/20 rounded-lg">
    <div className="flex items-center mb-4">
      <div className="text-primary mr-2">{icon}</div>
      <h3 className="text-primary font-semibold">{title}</h3>
    </div>
    <ul className="space-y-2 text-[rgb(var(--text-secondary))]">
      {items.map((item, index) => (
        <li key={index} className="flex items-center">
          <Target className="w-4 h-4 mr-2 text-primary" />
          {item}
        </li>
      ))}
    </ul>
  </div>
);
