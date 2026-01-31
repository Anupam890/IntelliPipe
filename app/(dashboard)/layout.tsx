"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Link2,
  GitBranch,
  Bot,
  Activity,
  ShieldCheck,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  User,
  Search,
  Plus,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Link2, label: "Connections", href: "/connections" },
  { icon: GitBranch, label: "Pipelines", href: "/pipelines" },
  { icon: Bot, label: "AI Studio", href: "/ai" },
  { icon: Activity, label: "Monitoring", href: "/monitoring" },
  { icon: ShieldCheck, label: "Data Quality", href: "/quality" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside
        className={cn(
          "relative flex flex-col border-r border-border/40 bg-zinc-950/50 backdrop-blur-xl transition-all duration-300 ease-in-out z-40",
          isCollapsed ? "w-20" : "w-64",
        )}
      >
        <div className="flex h-16 items-center px-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-8 w-8 min-w-[32px] items-center justify-center rounded-lg bg-primary shadow-lg shadow-primary/20">
              <span className="text-lg font-bold text-primary-foreground">
                I
              </span>
            </div>
            {!isCollapsed && (
              <span className="text-xl font-bold tracking-tight text-foreground animate-in fade-in slide-in-from-left-2 duration-300">
                InteliPipe
              </span>
            )}
          </Link>
        </div>

        <nav className="flex-1 space-y-1 px-2 py-4 overflow-y-auto no-scrollbar">
          {sidebarItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary/10 text-primary shadow-[inset_0_0_0_1px_rgba(99,102,241,0.2)]"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground",
                )}
              >
                <item.icon
                  size={20}
                  className={cn(
                    "transition-transform duration-200 group-hover:scale-110",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground group-hover:text-foreground",
                  )}
                />
                {!isCollapsed && (
                  <span className="animate-in fade-in slide-in-from-left-2 duration-300">
                    {item.label}
                  </span>
                )}
                {isActive && !isCollapsed && (
                  <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
                )}
              </Link>
            );
          })}

          <div className="pt-4 mt-4 border-t border-border/20">
            <Link
              href="/settings"
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                pathname.startsWith("/settings")
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground",
              )}
            >
              <Settings
                size={20}
                className="group-hover:rotate-45 transition-transform duration-300"
              />
              {!isCollapsed && <span>Settings</span>}
            </Link>
          </div>
        </nav>

        <div className="border-t border-border/20 p-4">
          <div
            className={cn(
              "flex items-center gap-3",
              isCollapsed && "justify-center",
            )}
          >
            <Avatar className="h-9 w-9 border border-border/50">
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                AM
              </AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="flex flex-col overflow-hidden animate-in fade-in slide-in-from-left-2 duration-300">
                <span className="text-sm font-semibold text-foreground truncate">
                  Anupam Mandal
                </span>
                <span className="text-[10px] text-muted-foreground truncate font-medium">
                  anupam@intelipipe.ai
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background shadow-md hover:bg-accent text-muted-foreground transition-colors"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 bg-background relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] rounded-full bg-indigo-500/5 blur-[120px] -z-10" />

        {/* Header */}
        <header className="flex h-16 items-center justify-between px-6 border-b border-border/40 bg-background/20 backdrop-blur-md z-30">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md group">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors"
                size={18}
              />
              <input
                placeholder="Search pipelines, tables, queries..."
                className="h-10 w-full rounded-full border border-border/40 bg-background/40 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-white/5 text-muted-foreground hover:text-foreground group"
            >
              <Bell size={20} className="group-hover:animate-bounce" />
            </Button>
            <Link href="/pipelines/new">
              <Button className="h-10 rounded-full bg-primary px-4 font-semibold text-sm shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
                <Plus size={18} className="mr-2" />
                New Pipeline
              </Button>
            </Link>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto no-scrollbar p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
