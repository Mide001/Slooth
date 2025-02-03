"use client";
import React, { useState, useRef, useEffect } from "react";
import { Bot, Send, Loader2, AlertCircle, MessageSquare } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
  type: "user" | "agent";
  content: string;
}

interface AIAgentInterfaceProps {
  apiEndpoint?: string;
  title?: string;
}

export const AIAgentInterface: React.FC<AIAgentInterfaceProps> = ({
  apiEndpoint = "/api/chat",
  title = "Mode AI Agent Interface",
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setError("");

    const userMessage: Message = {
      type: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to get response");

      setMessages((prev) => [...prev, { type: "agent", content: data.text }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const MessageContent = ({
    content,
    type,
  }: {
    content: string;
    type: "user" | "agent";
  }) => {
    if (type === "user") {
      return <div className="whitespace-pre-wrap">{content}</div>;
    }

    return (
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ node, ...props }) => <p className="mb-4" {...props} />,
          ul: ({ node, ...props }) => (
            <ul className="list-disc ml-6 mb-4" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal ml-6 mb-4" {...props} />
          ),
          h1: ({ node, ...props }) => (
            <h1 className="text-2xl font-bold mb-4 mt-6" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-xl font-bold mb-3 mt-5" {...props} />
          ),
          strong: ({ node, ...props }) => (
            <strong className="font-semibold" {...props} />
          ),
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto mb-4">
              <table
                className="min-w-full divide-y divide-gray-200"
                {...props}
              />
            </div>
          ),
          th: ({ node, ...props }) => (
            <th
              className="px-4 py-2 bg-gray-50 text-left text-sm font-medium text-gray-500"
              {...props}
            />
          ),
          td: ({ node, ...props }) => (
            <td className="px-4 py-2 text-sm" {...props} />
          ),
          code: ({
            node,
            inline,
            ...props
          }: { node?: any; inline?: boolean } & React.HTMLProps<HTMLElement>) =>
            inline ? (
              <code
                className="px-1 py-0.5 bg-gray-100 rounded text-sm font-mono"
                {...props}
              />
            ) : (
              <pre className="p-4 bg-gray-100 rounded-lg overflow-x-auto mb-4">
                <code className="text-sm font-mono" {...props} />
              </pre>
            ),
        }}
      >
        {content}
      </ReactMarkdown>
    );
  };

  return (
    <Card className="w-full mx-auto border-primary/20 bg-[rgb(var(--background))] text-[rgb(var(--text-primary))] shadow-[0_0_30px_rgba(0,0,0,0.3)]">
      <CardHeader className="border-b border-primary/20">
        <CardTitle className="text-xl font-semibold flex items-center gap-2 text-primary">
          <Bot className="w-5 h-5" />
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 p-0 h-[600px]">
        <ScrollArea className="h-full">
          <div className="p-6 space-y-6">
            {messages.map((message, idx) => (
              <div
                key={idx}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                } relative`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-4 ${
                    message.type === "user"
                      ? "bg-primary text-[rgb(var(--primary-foreground))] shadow-[0_4px_20px_rgba(var(--primary),0.25)]"
                      : "bg-[rgb(var(--card-background))] text-[rgb(var(--text-primary))] border-2 border-primary/20 shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
                  }`}
                >
                  {/* Message pointer */}
                  <div
                    className={`absolute top-4 ${
                      message.type === "user"
                        ? "right-[-8px] border-l-primary"
                        : "left-[-8px] border-r-[rgb(var(--card-background))]"
                    } w-4 h-4 transform rotate-45 ${
                      message.type === "user"
                        ? "bg-primary"
                        : "bg-[rgb(var(--card-background))] border-2 border-primary/20"
                    }`}
                  />

                  {/* Message timestamp */}
                  <div
                    className={`text-xs mb-1 ${
                      message.type === "user"
                        ? "text-[rgb(var(--primary-foreground))]"
                        : "text-primary"
                    }`}
                  >
                    {new Date().toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>

                  {/* Message content with enhanced typography */}
                  <div
                    className={`${
                      message.type === "user" ? "font-medium" : "font-normal"
                    }`}
                  >
                    <MessageContent
                      content={message.content}
                      type={message.type}
                    />
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-center">
                <div className="bg-[rgb(var(--card-background))] border-2 border-primary/20 rounded-lg p-4 flex items-center space-x-2 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  <span className="text-[rgb(var(--text-secondary))]">
                    Analyzing...
                  </span>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>

      <div className="p-4 border-t border-primary/20">
        {error && (
          <Alert
            variant="destructive"
            className="mb-4 border-2 border-red-500/20 bg-red-900/10 shadow-[0_4px_20px_rgba(239,68,68,0.1)]"
          >
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about tokens, trades, or market analysis..."
            className="flex-1 rounded-lg border-2 border-primary/20 bg-[rgb(var(--card-background))] p-3 text-[rgb(var(--text-primary))] placeholder:text-[rgb(var(--text-secondary))] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-[0_2px_10px_rgba(0,0,0,0.1)]"
            disabled={loading}
          />
          <Button
            type="submit"
            disabled={loading}
            className="rounded-lg mt-2 bg-primary hover:bg-primary/90 text-[rgb(var(--primary-foreground))] font-medium shadow-[0_4px_20px_rgba(var(--primary),0.25)]"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </form>
      </div>
    </Card>
  );
};
