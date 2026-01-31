"use client";

import React from "react";
import {
  Activity,
  BarChart,
  Clock,
  Filter,
  Search,
  RefreshCw,
  ChevronRight,
  Terminal,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Play,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const timeline = [
  {
    time: "16:45",
    name: "Daily Sales Sync",
    status: "Success",
    duration: "1m 12s",
    rows: "1.2k",
  },
  {
    time: "16:30",
    name: "Inventory Audit",
    status: "Failed",
    duration: "12s",
    rows: "0",
    error: "Source timeout",
  },
  {
    time: "16:00",
    name: "User Events Ingest",
    status: "Success",
    duration: "5m 45s",
    rows: "12.4k",
  },
  {
    time: "15:45",
    name: "Customer Risk Model",
    status: "Success",
    duration: "3m 22s",
    rows: "500",
  },
  {
    time: "15:30",
    name: "Marketing SQL Aggregator",
    status: "Success",
    duration: "45s",
    rows: "80",
  },
];

export default function MonitoringPage() {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Monitoring
          </h1>
          <p className="text-muted-foreground mt-1 text-sm font-medium">
            Real-time visibility into your data operations and health.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="rounded-full border-border/40 bg-card/30 font-bold h-10 px-4"
          >
            <RefreshCw size={16} className="mr-2" />
            Refresh
          </Button>
          <Button className="rounded-full bg-primary font-bold shadow-lg shadow-primary/20 h-10 px-4">
            Retry All Failed
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-border/40 bg-card/30 backdrop-blur-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Successful Runs
            </p>
            <CheckCircle2 size={16} className="text-green-500" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-3xl font-bold text-foreground">142</span>
            <span className="text-[10px] font-medium text-green-500 underline underline-offset-4 decoration-current">
              +12 from yesterday
            </span>
          </div>
        </Card>
        <Card className="border-border/40 bg-card/30 backdrop-blur-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Average Duration
            </p>
            <Clock size={16} className="text-blue-500" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-3xl font-bold text-foreground">2m 45s</span>
            <span className="text-[10px] font-medium text-blue-500 underline underline-offset-4 decoration-current">
              -15s optimization impact
            </span>
          </div>
        </Card>
        <Card className="border-border/40 bg-card/30 backdrop-blur-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Failure Rate
            </p>
            <AlertCircle size={16} className="text-red-500" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-3xl font-bold text-foreground">1.4%</span>
            <span className="text-[10px] font-medium text-red-500 underline underline-offset-4 decoration-current">
              +0.2% check connections
            </span>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timeline Table */}
        <Card className="lg:col-span-2 border-border/40 bg-card/30 backdrop-blur-sm overflow-hidden">
          <CardHeader className="border-b border-border/20">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold">
                Execution Timeline
              </CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative group">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    size={14}
                  />
                  <Input
                    placeholder="Search logs..."
                    className="h-8 pl-8 pr-4 bg-background/40 border-border/40 text-[10px] w-48 rounded-lg"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/40 bg-white/5">
                    <th className="h-10 px-6 text-left font-bold text-muted-foreground uppercase tracking-widest text-[10px]">
                      Time
                    </th>
                    <th className="h-10 px-6 text-left font-bold text-muted-foreground uppercase tracking-widest text-[10px]">
                      Pipeline
                    </th>
                    <th className="h-10 px-6 text-left font-bold text-muted-foreground uppercase tracking-widest text-[10px]">
                      Status
                    </th>
                    <th className="h-10 px-6 text-left font-bold text-muted-foreground uppercase tracking-widest text-[10px]">
                      Duration
                    </th>
                    <th className="h-10 px-6 text-right font-bold text-muted-foreground uppercase tracking-widest text-[10px]">
                      Rows
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/20">
                  {timeline.map((item, idx) => (
                    <tr
                      key={idx}
                      className="group hover:bg-white/[0.02] transition-colors cursor-pointer"
                    >
                      <td className="p-4 px-6 font-medium text-muted-foreground text-xs">
                        {item.time}
                      </td>
                      <td className="p-4 px-6 font-bold text-foreground text-xs">
                        {item.name}
                      </td>
                      <td className="p-4 px-6">
                        <Badge
                          className={cn(
                            "rounded-full px-2 py-0 h-5 text-[9px] font-bold uppercase tracking-widest border-0",
                            item.status === "Success"
                              ? "bg-green-500/10 text-green-500"
                              : "bg-red-500/10 text-red-500",
                          )}
                        >
                          {item.status}
                        </Badge>
                      </td>
                      <td className="p-4 px-6 text-xs text-muted-foreground">
                        {item.duration}
                      </td>
                      <td className="p-4 px-6 text-right text-xs font-bold text-foreground">
                        {item.rows}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Log Viewer Side */}
        <div className="space-y-6">
          <Card className="border-border/40 bg-zinc-950/20 backdrop-blur-sm overflow-hidden flex flex-col h-full min-h-[400px]">
            <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-border/20">
              <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                <Terminal size={12} />
                Live Runner Logs
              </div>
              <Badge
                variant="outline"
                className="h-4 border-green-500/40 text-green-500 text-[8px] animate-pulse"
              >
                Live
              </Badge>
            </div>
            <div className="p-4 font-mono text-[10px] leading-relaxed overflow-y-auto no-scrollbar flex-1 bg-black/40">
              <div className="space-y-1.5 break-all">
                <p className="text-zinc-500">
                  {"[16:45:01]"} <span className="text-blue-500">INFO</span>{" "}
                  Initializing runner context...
                </p>
                <p className="text-zinc-500">
                  {"[16:45:02]"} <span className="text-blue-500">INFO</span>{" "}
                  Connecting to Snowflake (WAREHOUSE=COMPUTE_WH)
                </p>
                <p className="text-zinc-500">
                  {"[16:45:03]"} <span className="text-blue-500">INFO</span>{" "}
                  Executing transformation layer...
                </p>
                <p className="text-zinc-500">
                  {"[16:45:04]"} <span className="text-green-500">SUCCESS</span>{" "}
                  Ingested 1.2k rows into target.
                </p>
                <p className="text-zinc-500">
                  {"[16:45:05]"} <span className="text-blue-500">INFO</span>{" "}
                  Finalizing run metadata.
                </p>
                <div className="h-px w-full bg-border/20 my-2" />
                <p className="text-zinc-500">
                  {"[16:30:10]"} <span className="text-red-500">ERROR</span>{" "}
                  Pipeline &apos;Inventory Audit&apos; failed.
                </p>
                <p className="text-zinc-500">
                  {"[16:30:11]"} <span className="text-red-400">DETAIL</span>{" "}
                  Snowflake execution error: SQL timeout after 60s.
                </p>
                <p className="text-indigo-400 mt-2 font-bold opacity-80 animate-pulse">
                  {"//"} AI Suggestion: Increase statement timeout for this
                  specific DAG.
                </p>
              </div>
            </div>
            <div className="p-3 border-t border-border/20 bg-white/5">
              <Button
                size="sm"
                className="w-full h-8 text-[10px] uppercase tracking-widest font-bold gap-2"
              >
                <Play size={10} />
                Backfill Range
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
