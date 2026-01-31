"use client";

import React from "react";
import {
  Database,
  Plus,
  Search,
  MoreVertical,
  ExternalLink,
  ShieldCheck,
  Activity,
  AlertCircle,
  RefreshCw,
  Edit2,
  Trash2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const connections = [
  {
    id: "1",
    name: "Production Snowflake",
    type: "Snowflake",
    status: "Connected",
    database: "INTELIPIPE_PROD",
    lastTested: "5m ago",
    reliability: "99.9%",
    icon: <Database size={24} />,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    id: "2",
    name: "Marketing BigQuery",
    type: "Google BigQuery",
    status: "Connected",
    database: "mktg_analytics_v2",
    lastTested: "1h ago",
    reliability: "98.5%",
    icon: <Database size={24} />,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    id: "3",
    name: "Legacy PostgreSQL",
    type: "PostgreSQL",
    status: "Error",
    database: "users_auth_old",
    lastTested: "12m ago",
    reliability: "92.0%",
    icon: <Database size={24} />,
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
  },
];

export default function ConnectionsPage() {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Connections
          </h1>
          <p className="text-muted-foreground mt-1 text-sm font-medium">
            Manage your data sources and destinations securely.
          </p>
        </div>
        <Button className="rounded-full bg-primary font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all">
          <Plus size={18} className="mr-2" />
          Add Connection
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm group">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors"
            size={16}
          />
          <Input
            placeholder="Search connections..."
            className="h-10 pl-10 bg-background/40 border-border/40 rounded-full focus:ring-primary/20"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full border-border/40 bg-card/30 text-xs font-bold"
          >
            All Sources
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full border-border/40 bg-card/30 text-xs font-bold opacity-50"
          >
            Destinations
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {connections.map((conn, idx) => (
          <motion.div
            key={conn.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="border-border/40 bg-card/30 backdrop-blur-sm group hover:border-primary/30 transition-all shadow-xl">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div
                    className={`p-3 rounded-2xl ${conn.bg} ${conn.color} shadow-inner group-hover:scale-110 transition-transform duration-300`}
                  >
                    {conn.icon}
                  </div>
                  <div className="flex items-center gap-1">
                    <Badge
                      variant="outline"
                      className={cn(
                        "rounded-full px-2 py-0 h-5 text-[10px] font-bold uppercase tracking-tighter border-0",
                        conn.status === "Connected"
                          ? "bg-green-500/10 text-green-500"
                          : "bg-red-500/10 text-red-500",
                      )}
                    >
                      {conn.status === "Connected" ? (
                        <ShieldCheck className="mr-1" size={10} />
                      ) : (
                        <AlertCircle className="mr-1" size={10} />
                      )}
                      {conn.status}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground"
                    >
                      <MoreVertical size={16} />
                    </Button>
                  </div>
                </div>
                <div className="pt-4">
                  <CardTitle className="text-lg font-bold text-foreground">
                    {conn.name}
                  </CardTitle>
                  <CardDescription className="text-xs font-medium text-muted-foreground uppercase tracking-widest mt-1">
                    {conn.type}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      Database
                    </p>
                    <p className="text-xs font-semibold text-foreground truncate">
                      {conn.database}
                    </p>
                  </div>
                  <div className="space-y-1 text-right">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      Reliability
                    </p>
                    <p className="text-xs font-bold text-green-500">
                      {conn.reliability}
                    </p>
                  </div>
                </div>
                <div className="h-1.5 w-full bg-border/20 rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-500",
                      conn.status === "Connected"
                        ? "w-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]"
                        : "w-[40%] bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]",
                    )}
                  />
                </div>
              </CardContent>
              <CardFooter className="pt-0 flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1 h-8 rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-white/5 border border-border/20"
                >
                  <RefreshCw size={12} className="mr-2" />
                  Test
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1 h-8 rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-white/5 border border-border/20"
                >
                  <Edit2 size={12} className="mr-2" />
                  Edit
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}

        {/* Add Connection Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="h-full"
        >
          <button className="h-full w-full rounded-3xl border-2 border-dashed border-border/40 bg-white/[0.02] hover:bg-white/[0.04] hover:border-primary/40 transition-all group flex flex-col items-center justify-center p-12 gap-4">
            <div className="h-14 w-14 rounded-full bg-border/20 flex items-center justify-center text-muted-foreground group-hover:scale-110 group-hover:bg-primary/20 group-hover:text-primary transition-all duration-300 shadow-inner">
              <Plus size={32} />
            </div>
            <div className="text-center">
              <p className="font-bold text-foreground">New Connection</p>
              <p className="text-xs text-muted-foreground font-medium mt-1">
                Configure a new data source
              </p>
            </div>
          </button>
        </motion.div>
      </div>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
