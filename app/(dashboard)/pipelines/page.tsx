"use client";

import React from "react";
import Link from "next/link";
import {
  GitBranch,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Play,
  Clock,
  Calendar,
  Settings2,
  AlertTriangle,
  CheckCircle2,
  PauseCircle,
  History,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const pipelines = [
  {
    id: "p1",
    name: "Customer Data Warehouse Sync",
    status: "Active",
    lastRun: "Success",
    lastRunTime: "22m ago",
    schedule: "Every 6h",
    owner: "Anupam M.",
    reliability: 98,
  },
  {
    id: "p2",
    name: "Real-time Event Ingestion",
    status: "Active",
    lastRun: "Running",
    lastRunTime: "Active Now",
    schedule: "Streaming",
    owner: "Systems",
    reliability: 100,
  },
  {
    id: "p3",
    name: "Marketing SQL Aggregator",
    status: "Paused",
    lastRun: "Success",
    lastRunTime: "1d ago",
    schedule: "Daily @ 00:00",
    owner: "Sarah L.",
    reliability: 95,
  },
  {
    id: "p4",
    name: "Fraud Detection Pipeline",
    status: "Error",
    lastRun: "Failed",
    lastRunTime: "3h ago",
    schedule: "Every 15m",
    owner: "Security Bot",
    reliability: 82,
  },
];

export default function PipelinesPage() {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Pipelines
          </h1>
          <p className="text-muted-foreground mt-1 text-sm font-medium">
            Create and monitor your data automation workflows.
          </p>
        </div>
        <Link href="/pipelines/new">
          <Button className="rounded-full bg-primary font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all">
            <Plus size={18} className="mr-2" />
            Create Pipeline
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm group">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors"
            size={16}
          />
          <Input
            placeholder="Search pipelines..."
            className="h-10 pl-10 bg-background/40 border-border/40 rounded-full focus:ring-primary/20"
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          className="rounded-full border-border/40 bg-card/30 text-xs font-bold gap-2"
        >
          <Filter size={14} />
          Filter
        </Button>
      </div>

      <Card className="border-border/40 bg-card/30 backdrop-blur-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/40 bg-white/5">
                  <th className="h-12 px-6 text-left align-middle font-bold text-muted-foreground uppercase tracking-widest text-[10px]">
                    Pipeline Name
                  </th>
                  <th className="h-12 px-6 text-left align-middle font-bold text-muted-foreground uppercase tracking-widest text-[10px]">
                    Status
                  </th>
                  <th className="h-12 px-6 text-left align-middle font-bold text-muted-foreground uppercase tracking-widest text-[10px]">
                    Schedule
                  </th>
                  <th className="h-12 px-6 text-left align-middle font-bold text-muted-foreground uppercase tracking-widest text-[10px]">
                    Health
                  </th>
                  <th className="h-12 px-6 text-left align-middle font-bold text-muted-foreground uppercase tracking-widest text-[10px]">
                    Last Run
                  </th>
                  <th className="h-12 px-6 text-right align-middle font-bold text-muted-foreground uppercase tracking-widest text-[10px]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20">
                {pipelines.map((p, idx) => (
                  <motion.tr
                    key={p.id}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="group hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="p-6 align-middle">
                      <div className="flex flex-col">
                        <Link
                          href={`/pipelines/${p.id}`}
                          className="font-bold text-foreground hover:text-primary transition-colors hover:underline underline-offset-4 decoration-primary/40"
                        >
                          {p.name}
                        </Link>
                        <span className="text-[10px] text-muted-foreground font-medium mt-1">
                          ID: {p.id} • Created by {p.owner}
                        </span>
                      </div>
                    </td>
                    <td className="p-6 align-middle">
                      <Badge
                        variant="outline"
                        className={cn(
                          "rounded-full px-2 py-0 h-5 text-[10px] font-bold uppercase tracking-tighter border-0",
                          p.status === "Active"
                            ? "bg-primary/10 text-primary"
                            : "bg-zinc-500/10 text-zinc-500",
                          p.status === "Error" && "bg-red-500/10 text-red-500",
                        )}
                      >
                        {p.status === "Active" ? (
                          <CheckCircle2 className="mr-1" size={10} />
                        ) : (
                          <PauseCircle className="mr-1" size={10} />
                        )}
                        {p.status}
                      </Badge>
                    </td>
                    <td className="p-6 align-middle">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar size={12} />
                        <span className="text-xs font-medium">
                          {p.schedule}
                        </span>
                      </div>
                    </td>
                    <td className="p-6 align-middle">
                      <div className="flex flex-col gap-1.5 min-w-[100px]">
                        <div className="flex justify-between items-center text-[10px] font-bold">
                          <span
                            className={
                              p.reliability > 90
                                ? "text-green-500"
                                : "text-amber-500"
                            }
                          >
                            {p.reliability}%
                          </span>
                        </div>
                        <div className="h-1 w-full bg-border/20 rounded-full overflow-hidden">
                          <div
                            className={cn(
                              "h-full rounded-full transition-all duration-500",
                              p.reliability > 90
                                ? "bg-green-500"
                                : "bg-amber-500",
                            )}
                            style={{ width: `${p.reliability}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="p-6 align-middle">
                      <div className="flex items-center gap-2 shadow-sm">
                        {p.lastRun === "Success" && (
                          <CheckCircle2 size={14} className="text-green-500" />
                        )}
                        {p.lastRun === "Failed" && (
                          <AlertTriangle size={14} className="text-red-500" />
                        )}
                        {p.lastRun === "Running" && (
                          <Clock
                            size={14}
                            className="text-primary animate-spin"
                          />
                        )}
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold text-foreground leading-none">
                            {p.lastRun}
                          </span>
                          <span className="text-[10px] text-muted-foreground mt-1">
                            {p.lastRunTime}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="p-6 align-middle text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary"
                        >
                          <Play size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full hover:bg-white/10"
                        >
                          <History size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full hover:bg-white/10"
                        >
                          <MoreHorizontal size={16} />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
