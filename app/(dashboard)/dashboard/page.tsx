"use client";

import React from "react";
import {
  GitBranch,
  Activity,
  Zap,
  AlertCircle,
  Clock,
  MoreHorizontal,
  ChevronRight,
  Database,
  ArrowUpRight,
  Sparkles,
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

const stats = [
  {
    label: "Total Pipelines",
    value: "32",
    icon: GitBranch,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    label: "Running Now",
    value: "12",
    icon: Activity,
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    label: "Failed (24h)",
    value: "2",
    icon: AlertCircle,
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
  {
    label: "Data Freshness",
    value: "99.8%",
    icon: Clock,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
];

const recentRuns = [
  {
    name: "Daily Sales Sync",
    status: "Success",
    time: "2m ago",
    rows: "1.2k",
    database: "Snowflake",
  },
  {
    name: "User Events Ingest",
    status: "Running",
    time: "Active",
    rows: "450",
    database: "BigQuery",
  },
  {
    name: "Customer Risk Model",
    status: "Success",
    time: "1h ago",
    rows: "8.9k",
    database: "Snowflake",
  },
  {
    name: "Inventory Audit",
    status: "Failed",
    time: "3h ago",
    rows: "0",
    database: "Snowflake",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-1 text-sm font-medium">
            Welcome back! Here&apos;s what&apos;s happening with your pipelines.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select className="bg-background/40 border border-border/40 rounded-full px-4 h-9 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20">
            <option>Last 24 Hours</option>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="border-border/40 bg-card/30 backdrop-blur-sm hover:border-primary/20 transition-all group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between space-x-4">
                  <div className="space-y-1">
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-bold text-foreground tracking-tight">
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className={`p-3 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <stat.icon size={22} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Runs */}
        <Card className="lg:col-span-2 border-border/40 bg-card/30 backdrop-blur-sm overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <CardTitle className="text-lg font-bold">
                Recent Pipeline Runs
              </CardTitle>
              <CardDescription className="text-xs">
                Live status of your data infrastructure.
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-primary font-bold hover:bg-primary/10"
            >
              View All
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/40 bg-white/5">
                    <th className="h-10 px-6 text-left align-middle font-bold text-muted-foreground uppercase tracking-widest text-[10px]">
                      Pipeline
                    </th>
                    <th className="h-10 px-6 text-left align-middle font-bold text-muted-foreground uppercase tracking-widest text-[10px]">
                      Status
                    </th>
                    <th className="h-10 px-6 text-left align-middle font-bold text-muted-foreground uppercase tracking-widest text-[10px]">
                      Source
                    </th>
                    <th className="h-10 px-6 text-left align-middle font-bold text-muted-foreground uppercase tracking-widest text-[10px]">
                      Rows
                    </th>
                    <th className="h-10 px-6 text-right align-middle font-bold text-muted-foreground uppercase tracking-widest text-[10px]">
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/20">
                  {recentRuns.map((run, idx) => (
                    <tr
                      key={idx}
                      className="group hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="p-6 align-middle font-semibold text-foreground">
                        {run.name}
                      </td>
                      <td className="p-6 align-middle">
                        <Badge
                          variant="outline"
                          className={cn(
                            "rounded-full px-2 py-0 h-5 text-[10px] font-bold uppercase tracking-tighter border-0",
                            run.status === "Success" &&
                              "bg-green-500/10 text-green-500",
                            run.status === "Running" &&
                              "bg-blue-500/10 text-blue-500 animate-pulse",
                            run.status === "Failed" &&
                              "bg-red-500/10 text-red-500",
                          )}
                        >
                          {run.status}
                        </Badge>
                      </td>
                      <td className="p-6 align-middle">
                        <div className="flex items-center gap-2">
                          <Database
                            size={14}
                            className="text-muted-foreground"
                          />
                          <span className="text-xs font-medium text-muted-foreground">
                            {run.database}
                          </span>
                        </div>
                      </td>
                      <td className="p-6 align-middle text-xs font-medium text-muted-foreground">
                        {run.rows}
                      </td>
                      <td className="p-6 align-middle text-right text-xs font-medium text-muted-foreground">
                        {run.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* AI Insight & Usage */}
        <div className="space-y-6">
          <Card className="border-border/40 bg-gradient-to-br from-indigo-500/10 via-background/10 to-transparent p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 text-indigo-400 group-hover:rotate-12 transition-transform duration-500">
              <Sparkles size={24} />
            </div>
            <div className="space-y-4">
              <Badge className="bg-indigo-500/20 text-indigo-400 border-indigo-500/20 text-[10px] font-bold uppercase tracking-widest mb-2">
                AI Insight
              </Badge>
              <h3 className="text-lg font-bold text-foreground">
                Possible Optimization
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your{" "}
                <span className="text-foreground font-semibold">
                  Inventory Audit
                </span>{" "}
                pipeline has failed 3 times in 24h. AI analysis suggests a
                schema mismatch in the Snowflake source table.
              </p>
              <Button
                size="sm"
                className="w-full bg-indigo-500 hover:bg-indigo-600 font-bold text-xs h-9 mt-4"
              >
                Fix with AI Studio
              </Button>
            </div>
          </Card>

          <Card className="border-border/40 bg-card/30 backdrop-blur-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                Snowflake Usage
              </CardTitle>
              <ArrowUpRight size={16} className="text-muted-foreground" />
            </div>
            <div className="space-y-6">
              <div className="flex items-end justify-between">
                <span className="text-3xl font-bold text-foreground">4.2</span>
                <span className="text-xs text-muted-foreground font-medium pb-1">
                  / 10 Credits
                </span>
              </div>
              <div className="h-2 w-full bg-border/20 rounded-full overflow-hidden">
                <div className="h-full w-[42%] bg-primary shadow-[0_0_10px_rgba(99,102,241,0.5)] rounded-full" />
              </div>
              <p className="text-[10px] text-muted-foreground font-medium">
                Resetting in 12 days. Your current usage is 14% higher than last
                month.
              </p>
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
