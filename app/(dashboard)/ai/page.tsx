"use client";

import React, { useState } from "react";
import {
  Bot,
  Send,
  Sparkles,
  Database,
  GitBranch,
  Search,
  ArrowRight,
  Copy,
  Terminal,
  MessageSquare,
  History,
  Bookmark,
  Zap,
  Info,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

export default function AIStudioPage() {
  const [prompt, setPrompt] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);

  const onSend = () => {
    if (!prompt.trim()) return;

    setMessages([...messages, { role: "user", content: prompt }]);
    setPrompt("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content:
            "I've analyzed your requirements and generated a Snowflake pipeline DAG that aggregates daily sales events and loads them into your production warehouse.",
          code: `CREATE OR REPLACE TASK daily_sales_agg
WAREHOUSE = 'COMPUTE_WH'
SCHEDULE = 'USING CRON 0 0 * * * UTC'
AS
INSERT INTO analytics.daily_sales
SELECT 
    date_trunc('day', event_time) as sale_date,
    product_id,
    count(*) as total_orders,
    sum(amount) as total_revenue
FROM raw.sales_events
GROUP BY 1, 2;`,
          action: "Create Pipeline",
        },
      ]);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-112px)] relative">
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar for AI Studio */}
        <aside className="w-64 border-r border-border/40 bg-zinc-950/20 backdrop-blur-md flex flex-col hidden lg:flex">
          <div className="p-4 border-b border-border/40">
            <Button className="w-full justify-start gap-2 rounded-xl bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-all font-bold text-xs h-10">
              <Plus size={16} />
              New Prompt
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto no-scrollbar p-2 space-y-1">
            <div className="px-3 pt-4 pb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground opacity-50">
              Recent History
            </div>
            {[
              { icon: GitBranch, label: "Sales Aggregation DAG" },
              { icon: Database, label: "Fix Schema Mismatch" },
              { icon: MessageSquare, label: "Explain Data Drift" },
              { icon: Zap, label: "Optimize SQL Query" },
            ].map((item, idx) => (
              <button
                key={idx}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-muted-foreground hover:bg-white/5 hover:text-foreground transition-all text-left"
              >
                <item.icon size={16} className="shrink-0" />
                <span className="truncate">{item.label}</span>
              </button>
            ))}
          </div>
          <div className="p-4 border-t border-border/40">
            <div className="p-3 rounded-xl bg-indigo-500/5 border border-indigo-500/10 space-y-2">
              <div className="flex items-center gap-2 text-[10px] font-bold text-indigo-100 uppercase tracking-widest">
                <Bookmark size={12} />
                Saved Prompt
              </div>
              <p className="text-[10px] text-indigo-300 leading-relaxed font-medium">
                Auto-fix schema errors on Snowflake sync failures.
              </p>
            </div>
          </div>
        </aside>

        {/* Chat Interface */}
        <div className="flex-1 flex flex-col bg-background/40">
          <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-8">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center max-w-2xl mx-auto space-y-8 text-center animate-in fade-in zoom-in duration-500">
                <div className="h-20 w-20 rounded-[2rem] bg-indigo-500/10 flex items-center justify-center text-primary shadow-2xl shadow-primary/20 ring-1 ring-primary/20">
                  <Bot size={40} />
                </div>
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tight text-foreground">
                    AI Studio
                  </h1>
                  <p className="text-muted-foreground font-medium text-lg italic">
                    Build, debug, and optimize your data infrastructure with
                    natural language.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                  {[
                    "Create a daily sales aggregation pipeline in Snowflake",
                    "Explain why my SQL query is running slow",
                    "Fix the data drift in my user events source",
                    "Convert this CSV schema to a Snowflake DDL",
                  ].map((example, idx) => (
                    <button
                      key={idx}
                      onClick={() => setPrompt(example)}
                      className="p-4 rounded-2xl border border-border/40 bg-card/30 hover:bg-card/50 hover:border-primary/40 text-left text-xs font-semibold text-muted-foreground hover:text-foreground transition-all"
                    >
                      &ldquo;{example}&rdquo;
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="max-w-3xl mx-auto space-y-8">
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "flex gap-4",
                      msg.role === "user" ? "flex-row-reverse" : "",
                    )}
                  >
                    <div
                      className={cn(
                        "h-8 w-8 rounded-lg flex items-center justify-center shrink-0",
                        msg.role === "user"
                          ? "bg-zinc-800"
                          : "bg-primary shadow-lg shadow-primary/20 text-primary-foreground",
                      )}
                    >
                      {msg.role === "user" ? (
                        <User size={16} />
                      ) : (
                        <Bot size={16} />
                      )}
                    </div>
                    <div
                      className={cn(
                        "flex flex-col gap-4 max-w-[85%]",
                        msg.role === "user" ? "items-end" : "items-start",
                      )}
                    >
                      <div
                        className={cn(
                          "px-4 py-3 rounded-2xl text-sm leading-relaxed",
                          msg.role === "user"
                            ? "bg-primary text-primary-foreground font-medium"
                            : "bg-card/50 border border-border/40 text-foreground",
                        )}
                      >
                        {msg.content}
                      </div>

                      {msg.code && (
                        <div className="w-full rounded-xl overflow-hidden border border-border/40 bg-zinc-950 shadow-2xl group relative">
                          <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-border/20">
                            <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                              <Terminal size={12} />
                              Snowflake SQL
                            </div>
                            <button className="text-muted-foreground hover:text-foreground transition-colors">
                              <Copy size={14} />
                            </button>
                          </div>
                          <pre className="p-4 text-xs text-indigo-300 font-mono leading-relaxed overflow-x-auto no-scrollbar">
                            {msg.code}
                          </pre>
                          <div className="p-4 bg-white/5 border-t border-border/20 flex justify-end">
                            <Button
                              size="sm"
                              className="h-8 rounded-lg bg-primary font-bold text-[10px] uppercase tracking-wider shadow-lg shadow-primary/10"
                            >
                              Deploy to Snowflake
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <div className="flex gap-4">
                    <div className="h-8 w-8 rounded-lg bg-primary shadow-lg shadow-primary/20 text-primary-foreground flex items-center justify-center">
                      <Bot size={16} />
                    </div>
                    <div className="flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-card/50 border border-border/40">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary/50 animate-bounce" />
                      <div className="h-1.5 w-1.5 rounded-full bg-primary/50 animate-bounce delay-150" />
                      <div className="h-1.5 w-1.5 rounded-full bg-primary/50 animate-bounce delay-300" />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-6 bg-background/60 backdrop-blur-xl border-t border-border/40">
            <div className="max-w-3xl mx-auto">
              <div className="relative group">
                <Input
                  placeholder="Ask InteliPipe anything..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && onSend()}
                  className="h-14 pl-6 pr-14 rounded-2xl bg-background/80 border-border/60 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium shadow-2xl"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <Button
                    size="icon"
                    onClick={onSend}
                    disabled={!prompt.trim() || isTyping}
                    className="h-10 w-10 rounded-xl bg-primary shadow-lg shadow-primary/20 hover:scale-105 transition-all"
                  >
                    <Send size={18} />
                  </Button>
                </div>
              </div>
              <p className="mt-3 text-[10px] text-muted-foreground text-center font-medium opacity-50">
                AI can make mistakes. Verify critical SQL before deployment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

function User({ size, className }: { size: number; className: string }) {
  return (
    <div
      className={cn(
        "rounded-full border border-border bg-background",
        className,
      )}
    >
      <UserIcon size={size} />
    </div>
  );
}

function UserIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
