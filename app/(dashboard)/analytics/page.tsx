"use client";

import React, { useState } from "react";
import {
  BarChart3,
  Search,
  Terminal,
  Sparkles,
  MessageSquare,
  ArrowRight,
  Database,
  LineChart,
  PieChart,
  Code2,
  Bookmark,
  ChevronDown,
  Download,
  Share2,
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
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export default function AnalyticsPage() {
  const [query, setQuery] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleQuery = () => {
    if (!query) return;
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowResult(true);
    }, 1500);
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Analytics
          </h1>
          <p className="text-muted-foreground mt-1 text-sm font-medium">
            Query your data infrastructure with natural language.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="rounded-full border-border/40 bg-card/30 font-bold h-10 px-4"
          >
            <Bookmark size={16} className="mr-2" />
            Saved Queries
          </Button>
        </div>
      </div>

      <div className="relative group">
        <div className="absolute inset-0 bg-primary/20 blur-[100px] opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
        <Card className="border-border/40 bg-card/30 backdrop-blur-xl p-2 relative overflow-hidden shadow-2xl">
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <Sparkles
                className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400"
                size={20}
              />
              <Input
                placeholder="e.g. 'Show me total revenue by month for Snowflake pipelines'"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleQuery()}
                className="h-14 pl-12 pr-4 bg-transparent border-0 focus-visible:ring-0 text-lg font-medium placeholder:text-muted-foreground/50"
              />
            </div>
            <Button
              onClick={handleQuery}
              disabled={isGenerating || !query}
              className="h-12 px-6 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all"
            >
              {isGenerating ? "Analyzing..." : "Generate Analysis"}
              {!isGenerating && <ArrowRight size={18} className="ml-2" />}
            </Button>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Analysis Area */}
        <div className="lg:col-span-2 space-y-6">
          {showResult ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <Card className="border-border/40 bg-card/30 backdrop-blur-sm overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between border-b border-border/20 bg-white/5 py-3">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    <BarChart3 size={14} className="text-primary" />
                    Visual Analysis
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 rounded-md bg-white/5"
                    >
                      <Download size={12} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 rounded-md bg-white/5"
                    >
                      <Share2 size={12} />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="h-[300px] w-full flex flex-col items-center justify-center border-2 border-dashed border-border/20 rounded-3xl gap-4">
                    <div className="flex items-center gap-6">
                      <div className="h-32 w-12 bg-primary/20 rounded-t-lg animate-pulse" />
                      <div className="h-48 w-12 bg-indigo-500/30 rounded-t-lg animate-pulse delay-75" />
                      <div className="h-24 w-12 bg-primary/40 rounded-t-lg animate-pulse delay-150" />
                      <div className="h-40 w-12 bg-indigo-500/20 rounded-t-lg animate-pulse delay-200" />
                      <div className="h-56 w-12 bg-primary/50 rounded-t-lg animate-pulse delay-300" />
                    </div>
                    <p className="text-sm font-bold text-muted-foreground animate-pulse">
                      Rendering visual chart...
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/40 bg-zinc-950/40 backdrop-blur-sm overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between border-b border-border/20 bg-white/5 py-2">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    <Code2 size={14} className="text-indigo-400" />
                    Generated Snowflake SQL
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-[8px] font-bold uppercase tracking-widest gap-1.5 hover:bg-white/5"
                  >
                    <Bookmark size={10} /> Save Query
                  </Button>
                </CardHeader>
                <CardContent className="p-0">
                  <pre className="p-6 text-xs text-indigo-300 font-mono leading-relaxed overflow-x-auto no-scrollbar">
                    {`SELECT 
    DATE_TRUNC('MONTH', RUN_TIME) as MONTH,
    SUM(ROWS_PROCESSED) as TOTAL_ROWS,
    COUNT(CASE WHEN STATUS = 'SUCCESS' THEN 1 END) as SUCCESS_COUNT
FROM INTELIPIPE_METRICS.PIPELINE_RUNS
WHERE PLATFORM = 'SNOWFLAKE'
GROUP BY 1
ORDER BY 1 DESC;`}
                  </pre>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <Card className="h-[500px] border-border/40 bg-card/10 border-dashed flex flex-col items-center justify-center p-12 text-center gap-6">
              <div className="h-20 w-20 rounded-[2.5rem] bg-indigo-500/5 flex items-center justify-center text-indigo-500/40 border border-white/5 shadow-inner">
                <LineChart size={40} />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-foreground">
                  Awaiting Analysis
                </h3>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed max-w-sm">
                  Use the natural language input above to query your data
                  infrastructure. InteliPipe will generate the SQL and visualize
                  the results for you.
                </p>
              </div>
            </Card>
          )}
        </div>

        {/* Sidebar Insights */}
        <div className="space-y-6">
          <Card className="border-border/40 bg-card/30 backdrop-blur-sm p-6 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
              Quick Insights
            </h3>
            <div className="space-y-3">
              {[
                {
                  label: "Top Table",
                  value: "SALES_EVENTS",
                  color: "text-blue-500",
                },
                {
                  label: "Execution Time",
                  value: "↓ 12% MoM",
                  color: "text-green-500",
                },
                {
                  label: "Error Frequency",
                  value: "3.2 / day",
                  color: "text-red-500",
                },
              ].map((insight, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-border/20"
                >
                  <span className="text-[10px] font-bold text-muted-foreground uppercase">
                    {insight.label}
                  </span>
                  <span className={`text-xs font-bold ${insight.color}`}>
                    {insight.value}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="border-border/40 bg-gradient-to-br from-indigo-500/10 to-transparent p-6 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-[10px] font-bold text-indigo-400 uppercase tracking-widest">
              <Terminal size={14} />
              AI SQL Debugger
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed font-medium">
              Paste your SQL here to have the InteliPipe{" "}
              <strong>AI Assistant</strong> optimize it for performance or fix
              syntax errors.
            </p>
            <Button
              size="sm"
              className="w-full h-9 rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 font-bold text-[10px] uppercase tracking-wider hover:bg-black/20"
            >
              Run Debugger
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
