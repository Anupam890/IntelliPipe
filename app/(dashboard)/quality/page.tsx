"use client";

import React from "react";
import {
  ShieldCheck,
  AlertTriangle,
  Clock,
  Database,
  Search,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  ArrowUpRight,
  Filter,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

const checks = [
  {
    table: "PROD.SALES_EVENTS",
    check: "Null Constraints",
    status: "Pass",
    score: 100,
    impacts: 0,
  },
  {
    table: "PROD.USER_PROFILES",
    check: "Schema Consistency",
    status: "Warning",
    score: 85,
    impacts: 12,
  },
  {
    table: "ANALYTICS.DAILY_REVENUE",
    check: "Freshness",
    status: "Pass",
    score: 99,
    impacts: 0,
  },
  {
    table: "STAGING.MARKETING_LEADS",
    check: "Duplicates",
    status: "Fail",
    score: 42,
    impacts: 450,
  },
];

export default function QualityPage() {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Data Quality
          </h1>
          <p className="text-muted-foreground mt-1 text-sm font-medium">
            Automated health checks and observability for your data assets.
          </p>
        </div>
        <Button className="rounded-full bg-indigo-500 hover:bg-indigo-600 font-bold shadow-lg shadow-indigo-500/20 h-10 px-5">
          <Sparkles size={18} className="mr-2" />
          AI Rule Suggestion
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-border/40 bg-card/30 backdrop-blur-sm p-4 flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500">
            <ShieldCheck size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Overall Score
            </p>
            <p className="text-2xl font-bold text-foreground">94%</p>
          </div>
        </Card>
        <Card className="border-border/40 bg-card/30 backdrop-blur-sm p-4 flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Freshness
            </p>
            <p className="text-2xl font-bold text-foreground">99.2%</p>
          </div>
        </Card>
        <Card className="border-border/40 bg-card/30 backdrop-blur-sm p-4 flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
            <AlertTriangle size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Open Alerts
            </p>
            <p className="text-2xl font-bold text-foreground">3</p>
          </div>
        </Card>
        <Card className="border-border/40 bg-card/30 backdrop-blur-sm p-4 flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500">
            <Search size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Tables Scanned
            </p>
            <p className="text-2xl font-bold text-foreground">12</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-border/40 bg-card/30 backdrop-blur-sm overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-bold">
              Recent Assertions
            </CardTitle>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-lg"
              >
                <Filter size={16} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-lg"
              >
                <MoreVertical size={16} />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/40 bg-white/5">
                    <th className="h-10 px-6 text-left font-bold text-muted-foreground uppercase tracking-widest text-[10px]">
                      Table Asset
                    </th>
                    <th className="h-10 px-6 text-left font-bold text-muted-foreground uppercase tracking-widest text-[10px]">
                      Quality Check
                    </th>
                    <th className="h-10 px-6 text-left font-bold text-muted-foreground uppercase tracking-widest text-[10px]">
                      Score
                    </th>
                    <th className="h-10 px-6 text-right font-bold text-muted-foreground uppercase tracking-widest text-[10px]">
                      Impact
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/20">
                  {checks.map((c, idx) => (
                    <tr
                      key={idx}
                      className="group hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="p-4 px-6">
                        <div className="flex flex-col">
                          <span className="font-bold text-foreground text-xs">
                            {c.table}
                          </span>
                          <span className="text-[10px] text-muted-foreground font-medium">
                            Snowflake Destination
                          </span>
                        </div>
                      </td>
                      <td className="p-4 px-6">
                        <div className="flex items-center gap-2">
                          {c.status === "Pass" && (
                            <CheckCircle2
                              size={12}
                              className="text-green-500"
                            />
                          )}
                          {c.status === "Warning" && (
                            <AlertTriangle
                              size={12}
                              className="text-amber-500"
                            />
                          )}
                          {c.status === "Fail" && (
                            <XCircle size={12} className="text-red-500" />
                          )}
                          <span className="text-xs font-semibold text-foreground">
                            {c.check}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 px-6 min-w-[120px]">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-1.5 bg-border/20 rounded-full overflow-hidden">
                            <div
                              className={cn(
                                "h-full rounded-full",
                                c.score > 90
                                  ? "bg-green-500"
                                  : c.score > 70
                                    ? "bg-amber-500"
                                    : "bg-red-500",
                              )}
                              style={{ width: `${c.score}%` }}
                            />
                          </div>
                          <span className="text-[10px] font-bold w-6">
                            {c.score}%
                          </span>
                        </div>
                      </td>
                      <td className="p-4 px-6 text-right">
                        <span
                          className={cn(
                            "text-[10px] font-bold px-2 py-0.5 rounded-full",
                            c.impacts > 0
                              ? "bg-red-500/10 text-red-500"
                              : "bg-green-500/10 text-green-500",
                          )}
                        >
                          {c.impacts > 0 ? `${c.impacts} rows` : "0 impact"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
          <CardFooter className="bg-white/5 border-t border-border/20 p-4">
            <Button
              variant="ghost"
              className="w-full text-xs font-bold text-muted-foreground hover:text-foreground"
            >
              Explore Full Catalog
            </Button>
          </CardFooter>
        </Card>

        <div className="space-y-6">
          <Card className="border-border/40 bg-gradient-to-br from-indigo-500/10 to-transparent p-6 space-y-4">
            <div className="flex items-center gap-2 text-[10px] font-bold text-indigo-400 uppercase tracking-widest">
              <Sparkles size={14} />
              AI Rule Suggested
            </div>
            <h3 className="text-lg font-bold text-foreground leading-tight">
              Implement Null Check on PROD.USER_IDs
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              InteliPipe AI detected a trend of null values in the{" "}
              <span className="text-foreground">USER_ID</span> column increasing
              by <span className="text-red-500 font-bold">14%</span> over the
              last 3 days.
            </p>
            <div className="pt-2">
              <Button className="w-full h-9 rounded-xl bg-indigo-500 text-white font-bold text-xs">
                Create Quality Rule
              </Button>
            </div>
          </Card>

          <Card className="border-border/40 bg-card/30 backdrop-blur-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Schema Drift Alerts
              </p>
              <Badge className="bg-amber-500/10 text-amber-500 border-0 text-[10px] h-5">
                New
              </Badge>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-border/20 group cursor-pointer hover:border-primary/40 transition-all">
                <Database size={16} className="text-muted-foreground" />
                <div className="flex-1 overflow-hidden">
                  <p className="text-[10px] font-bold text-foreground">
                    SALES_TBL
                  </p>
                  <p className="text-[10px] text-muted-foreground truncate">
                    Column &apos;v_id&apos; was removed from source.
                  </p>
                </div>
                <ArrowUpRight
                  size={14}
                  className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </div>
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

function MoreVertical({
  size,
  className,
}: {
  size: number;
  className?: string;
}) {
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
      className={className}
    >
      <circle cx="12" cy="12" r="1" />
      <circle cx="12" cy="5" r="1" />
      <circle cx="12" cy="19" r="1" />
    </svg>
  );
}
