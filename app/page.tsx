"use client";

import React, { useCallback, useMemo } from "react";
import Link from "next/link";
import {
  ReactFlow,
  Background,
  Controls,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  MarkerType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  Database,
  Workflow,
  Table2,
  Bot,
  ShieldCheck,
  Activity,
  Zap,
  ChevronRight,
  ArrowRight,
  Github,
  Monitor,
  Cpu,
} from "lucide-react";
import { motion } from "framer-motion";

// --- Custom Node Components ---

const CustomNode = ({ data, selected }: any) => {
  return (
    <div
      className={`px-4 py-3 rounded-xl border bg-card/80 backdrop-blur-md shadow-2xl transition-all duration-300 ${selected ? "border-primary ring-2 ring-primary/20" : "border-border/50"}`}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg bg-primary/10 text-primary`}>
          {data.icon}
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {data.type}
          </div>
          <div className="text-sm font-bold text-foreground">{data.label}</div>
        </div>
      </div>
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

// --- Landing Page Content ---

export default function HomePage() {
  const initialNodes = [
    {
      id: "1",
      type: "custom",
      data: {
        label: "Snowflake",
        type: "Source",
        icon: <Database size={18} />,
      },
      position: { x: 0, y: 100 },
    },
    {
      id: "2",
      type: "custom",
      data: {
        label: "Clean & Aggregate",
        type: "Transform",
        icon: <Workflow size={18} />,
      },
      position: { x: 250, y: 100 },
    },
    {
      id: "3",
      type: "custom",
      data: {
        label: "Analytics Table",
        type: "Destination",
        icon: <Table2 size={18} />,
      },
      position: { x: 500, y: 100 },
    },
  ];

  const initialEdges = [
    {
      id: "e1-2",
      source: "1",
      target: "2",
      animated: true,
      style: { stroke: "#6366f1", strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: "#6366f1" },
    },
    {
      id: "e2-3",
      source: "2",
      target: "3",
      animated: true,
      style: { stroke: "#6366f1", strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: "#6366f1" },
    },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      {/* 1. Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/60 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-lg shadow-primary/20">
              <span className="text-lg font-bold text-primary-foreground">
                I
              </span>
            </div>
            <span className="text-xl font-bold tracking-tight">InteliPipe</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Features
            </Link>
            <Link
              href="#pipelines"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Pipelines
            </Link>
            <Link
              href="#ai"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              AI Studio
            </Link>
            <Link
              href="#docs"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Docs
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Login
            </Link>
            <Link href="/signup">
              <button className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* 2. Hero Section */}
        <section className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32">
          {/* Background Ambient Glow */}
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px] -z-10" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[120px] -z-10" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary mb-6">
                  <Bot size={14} />
                  <span>Now with Gemini AI Integration</span>
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-foreground !leading-[1.1]">
                  Build, Monitor, and Understand{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-400">
                    Data Pipelines with AI
                  </span>
                </h1>
                <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-xl">
                  InteliPipe lets you visually design pipelines, connect
                  Snowflake, and debug failures using AI — all in one platform.
                  Clean data, automated flows, and real-time monitoring.
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Link href="/signup">
                    <button className="flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-xl shadow-primary/25 hover:bg-primary/90 transition-all hover:translate-y-[-2px]">
                      Start Free <ArrowRight size={18} />
                    </button>
                  </Link>
                  <button className="flex items-center gap-2 rounded-full border border-border/60 bg-white/5 px-8 py-4 text-base font-bold text-foreground backdrop-blur-sm transition-all hover:bg-white/10">
                    View Demo
                  </button>
                </div>
              </motion.div>

              {/* 3. React Flow Pipeline Demo */}
              <motion.div
                className="relative h-[400px] w-full rounded-2xl border border-border/40 bg-card/30 shadow-2xl overflow-hidden backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-full border border-border/40 bg-background/80 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  <Activity
                    size={12}
                    className="text-green-500 animate-pulse"
                  />
                  Live Pipeline Status
                </div>

                <ReactFlowProvider>
                  <div className="h-full w-full grayscale-[0.2] hover:grayscale-0 transition-all duration-500">
                    <ReactFlow
                      nodes={nodes}
                      edges={edges}
                      onNodesChange={onNodesChange}
                      onEdgesChange={onEdgesChange}
                      nodeTypes={nodeTypes}
                      fitView
                      proOptions={{ hideAttribution: true }}
                      nodesConnectable={false}
                      nodesDraggable={false}
                      zoomOnScroll={false}
                      panOnDrag={false}
                    >
                      <Background color="#333" gap={20} />
                      <Controls
                        showInteractive={false}
                        className="!bg-background !border-border/40 !shadow-none"
                      />
                    </ReactFlow>
                  </div>
                </ReactFlowProvider>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 4. Features Section */}
        <section id="features" className="py-24 bg-zinc-950/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary mb-4">
              Enterprise Capable
            </h2>
            <p className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground mb-16">
              Everything you need for data engineering
            </p>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "Visual Pipelines",
                  desc: "Drag & drop pipeline builder for complex ETL workflows.",
                  icon: <Workflow className="h-6 w-6" />,
                },
                {
                  title: "Snowflake Native",
                  desc: "Securely connect your own Snowflake account with one click.",
                  icon: <Database className="h-6 w-6" />,
                },
                {
                  title: "AI-Powered",
                  desc: "Generate production-ready pipelines and SQL using prompts.",
                  icon: <Bot className="h-6 w-6" />,
                },
                {
                  title: "Monitoring & Quality",
                  desc: "Detect failures, schema drift, and freshness issues automatically.",
                  icon: <Activity className="h-6 w-6" />,
                },
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5 }}
                  className="group relative flex flex-col items-start p-8 rounded-2xl border border-border/40 bg-card/30 backdrop-blur-sm transition-all hover:bg-card/50 hover:border-primary/30"
                >
                  <div className="mb-6 rounded-xl bg-primary/10 p-3 text-primary group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed text-left">
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. AI Highlight Section */}
        <section id="ai" className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent -z-10" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl border border-border/40 bg-card/20 backdrop-blur-xl p-8 lg:p-16">
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight sm:text-5xl text-foreground">
                    Let AI build and debug{" "}
                    <span className="text-primary italic">pipelines</span> for
                    you
                  </h2>
                  <p className="mt-6 text-lg text-muted-foreground">
                    Our built-in LLM understands your schema and business logic.
                    Just explain what you need, and InteliPipe writes the SQL
                    and builds the DAG.
                  </p>
                  <button className="mt-8 flex items-center gap-2 rounded-full bg-foreground text-background font-bold px-8 py-4 transition-all hover:bg-zinc-200">
                    Try AI Studio
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="rounded-xl border border-border/40 bg-background/80 p-6 shadow-2xl">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        Prompt Example
                      </span>
                    </div>
                    <div className="text-lg font-medium text-foreground">
                      &ldquo;Create a daily sales aggregation pipeline in
                      Snowflake from the RAW_EVENTS table and load into
                      ANALYTICS_DB.&rdquo;
                    </div>
                    <div className="mt-6 flex justify-end">
                      <div className="flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-1 text-[10px] font-bold text-primary">
                        <Cpu size={12} />
                        Generating SQL...
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-1 rounded-xl border border-border/40 bg-background/40 p-4">
                      <Zap size={18} className="text-amber-400 mb-2" />
                      <div className="text-xs font-bold text-foreground">
                        Optimize SQL
                      </div>
                    </div>
                    <div className="flex-1 rounded-xl border border-border/40 bg-background/40 p-4">
                      <ShieldCheck size={18} className="text-green-400 mb-2" />
                      <div className="text-xs font-bold text-foreground">
                        Fix Data Drift
                      </div>
                    </div>
                    <div className="flex-1 rounded-xl border border-border/40 bg-background/40 p-4">
                      <Monitor size={18} className="text-primary mb-2" />
                      <div className="text-xs font-bold text-foreground">
                        Auto-Trace
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 6. Footer */}
      <footer className="border-t border-border/40 bg-zinc-950/50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
            <div className="col-span-2 lg:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <span className="text-lg font-bold text-primary-foreground">
                    I
                  </span>
                </div>
                <span className="text-xl font-bold tracking-tight">
                  InteliPipe
                </span>
              </div>
              <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                Empowering data teams to build robust, AI-powered pipelines on
                Snowflake with zero friction.
              </p>
              <div className="mt-8 flex gap-4">
                <Github
                  size={20}
                  className="text-muted-foreground hover:text-foreground hover:cursor-pointer transition-colors"
                />
                <Activity
                  size={20}
                  className="text-muted-foreground hover:text-foreground hover:cursor-pointer transition-colors"
                />
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-foreground uppercase tracking-widest mb-6">
                Product
              </h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="#features"
                    className="hover:text-primary transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#pipelines"
                    className="hover:text-primary transition-colors"
                  >
                    Pipelines
                  </Link>
                </li>
                <li>
                  <Link
                    href="#ai"
                    className="hover:text-primary transition-colors"
                  >
                    AI Studio
                  </Link>
                </li>
                <li>
                  <Link
                    href="/demo"
                    className="hover:text-primary transition-colors"
                  >
                    Live Demo
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-foreground uppercase tracking-widest mb-6">
                Resources
              </h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="#docs"
                    className="hover:text-primary transition-colors"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="hover:text-primary transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/security"
                    className="hover:text-primary transition-colors"
                  >
                    Security
                  </Link>
                </li>
                <li>
                  <Link
                    href="/api"
                    className="hover:text-primary transition-colors"
                  >
                    API Reference
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-foreground uppercase tracking-widest mb-6">
                Company
              </h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-primary transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-primary transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-primary transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-primary transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-border/20 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
            <p>
              &copy; {new Date().getFullYear()} InteliPipe. All rights reserved.
            </p>
            <p>Made for the modern data stack.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
