"use strict";
exports.__esModule = true;
var ai_interface_1 = require("@/components/ai-interface");
var lucide_react_1 = require("lucide-react");
function Home() {
    return (React.createElement("main", { className: "min-h-screen bg-[rgb(var(--background))]" },
        React.createElement("div", { className: "w-full border-b border-primary/20" },
            React.createElement("div", { className: "max-w-6xl mx-auto px-4 py-8" },
                React.createElement("div", { className: "flex flex-col items-center text-center mb-12" },
                    React.createElement("div", { className: "flex items-center justify-center w-20 h-20 bg-primary rounded-full mb-4 shadow-[0_0_30px_rgba(var(--primary),0.3)]" },
                        React.createElement(lucide_react_1.Bot, { className: "w-10 h-10 text-[rgb(var(--primary-foreground))]" })),
                    React.createElement("h1", { className: "text-6xl font-bold text-primary mb-2" }, "Slooth"),
                    React.createElement("p", { className: "text-xl text-[rgb(var(--text-secondary))] mt-2 max-w-2xl" }, "Your AI-Powered Crypto Research & Trading Agent")),
                React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8" },
                    React.createElement(FeatureCard, { icon: React.createElement(lucide_react_1.Search, { className: "w-6 h-6" }), title: "Token Analysis", description: "Deep dive into token metrics, market trends, and risk analysis with real-time data" }),
                    React.createElement(FeatureCard, { icon: React.createElement(lucide_react_1.Shuffle, { className: "w-6 h-6" }), title: "Smart Swaps", description: "Get optimal swap routes and timing suggestions based on market conditions" }),
                    React.createElement(FeatureCard, { icon: React.createElement(lucide_react_1.Copy, { className: "w-6 h-6" }), title: "Copy Trading", description: "Track and analyze successful traders' performance for informed copy trading" })),
                React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-12" },
                    React.createElement(InfoCard, { icon: React.createElement(lucide_react_1.LineChart, { className: "w-5 h-5" }), title: "Performance Tracking", items: [
                            "Historical trading analysis",
                            "Profit/loss calculations",
                            "Risk metrics assessment",
                        ] }),
                    React.createElement(InfoCard, { icon: React.createElement(lucide_react_1.TrendingUp, { className: "w-5 h-5" }), title: "Market Intelligence", items: [
                            "Real-time market analysis",
                            "Sentiment tracking",
                            "Trend prediction",
                        ] })))),
        React.createElement("div", { className: "max-w-6xl mx-auto px-4 py-8" },
            React.createElement(ai_interface_1.AIAgentInterface, { title: "Ask Slooth" }))));
}
exports["default"] = Home;
// Component for feature cards
var FeatureCard = function (_a) {
    var icon = _a.icon, title = _a.title, description = _a.description;
    return (React.createElement("div", { className: "flex items-start p-6 bg-[rgb(var(--background))] border border-primary/20 rounded-lg hover:border-primary/40 transition-all" },
        React.createElement("div", { className: "icon-container w-12 h-12 bg-primary mr-4" },
            React.createElement("div", { className: "text-[rgb(var(--primary-foreground))]" }, icon)),
        React.createElement("div", null,
            React.createElement("h3", { className: "font-semibold text-primary text-lg mb-2" }, title),
            React.createElement("p", { className: "text-sm text-[rgb(var(--text-secondary))]" }, description))));
};
// Component for info cards
var InfoCard = function (_a) {
    var icon = _a.icon, title = _a.title, items = _a.items;
    return (React.createElement("div", { className: "p-6 bg-[rgb(var(--background))] border border-primary/20 rounded-lg" },
        React.createElement("div", { className: "flex items-center mb-4" },
            React.createElement("div", { className: "text-primary mr-2" }, icon),
            React.createElement("h3", { className: "text-primary font-semibold" }, title)),
        React.createElement("ul", { className: "space-y-2 text-[rgb(var(--text-secondary))]" }, items.map(function (item, index) { return (React.createElement("li", { key: index, className: "flex items-center" },
            React.createElement(lucide_react_1.Target, { className: "w-4 h-4 mr-2 text-primary" }),
            item)); }))));
};
