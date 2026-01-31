"use client";

import React, { useCallback, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  MarkerType,
  Handle,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  Database,
  Workflow,
  Table2,
  Play,
  Save,
  Calendar,
  Trash2,
  ChevronLeft,
  Settings2,
  Info,
  Sparkles,
  Search,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// --- Custom Nodes ---

const NodeShell = ({ children, label, icon, type, selected }: any) => (
  <div
    className={`p-4 rounded-xl border bg-card/80 backdrop-blur-md min-w-[180px] shadow-2xl transition-all ${selected ? "border-primary ring-2 ring-primary/20 scale-105" : "border-border/50"}`}
  >
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-lg bg-primary/10 text-primary">{icon}</div>
      <div className="flex-1 overflow-hidden">
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          {type}
        </p>
        <p className="text-sm font-bold text-foreground truncate">{label}</p>
      </div>
    </div>
    {children}
  </div>
);

const SourceNode = ({ data, selected }: any) => (
  <NodeShell
    label={data.label}
    icon={<Database size={18} />}
    type="Source"
    selected={selected}
  >
    <Handle
      type="source"
      position={Position.Right}
      className="w-3 h-3 bg-primary border-2 border-background"
    />
  </NodeShell>
);

const TransformNode = ({ data, selected }: any) => (
  <NodeShell
    label={data.label}
    icon={<Workflow size={18} />}
    type="Transform"
    selected={selected}
  >
    <Handle
      type="target"
      position={Position.Left}
      className="w-3 h-3 bg-primary border-2 border-background"
    />
    <Handle
      type="source"
      position={Position.Right}
      className="w-3 h-3 bg-primary border-2 border-background"
    />
  </NodeShell>
);

const DestinationNode = ({ data, selected }: any) => (
  <NodeShell
    label={data.label}
    icon={<Table2 size={18} />}
    type="Destination"
    selected={selected}
  >
    <Handle
      type="target"
      position={Position.Left}
      className="w-3 h-3 bg-primary border-2 border-background"
    />
  </NodeShell>
);

const nodeTypes = {
  source: SourceNode,
  transform: TransformNode,
  destination: DestinationNode,
};

// --- Main Builder Page ---

export default function PipelineBuilderPage({
  params,
}: {
  params: { id: string };
}) {
  const [selectedNode, setSelectedNode] = useState<any>(null);

  const initialNodes = [
    {
      id: "source-1",
      type: "source",
      data: { label: "Snowflake: Raw Events" },
      position: { x: 100, y: 150 },
    },
    {
      id: "transform-1",
      type: "transform",
      data: { label: "Clean & Map Schema" },
      position: { x: 400, y: 150 },
    },
    {
      id: "destination-1",
      type: "destination",
      data: { label: "S3: Archive" },
      position: { x: 700, y: 150 },
    },
  ];

  const initialEdges = [
    {
      id: "e1-2",
      source: "source-1",
      target: "transform-1",
      animated: true,
      style: { stroke: "#6366f1", strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: "#6366f1" },
    },
    {
      id: "e2-3",
      source: "transform-1",
      target: "destination-1",
      animated: true,
      style: { stroke: "#6366f1", strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: "#6366f1" },
    },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onNodeClick = useCallback((event: any, node: any) => {
    setSelectedNode(node);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  return (
    <div className="flex flex-col h-[calc(100vh-112px)] -m-6">
      {/* Builder Toolbar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border/40 bg-zinc-950/20 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <Link href="/pipelines">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full hover:bg-white/5"
            >
              <ChevronLeft size={20} />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-foreground">
                Sync Raw Events
              </h1>
              <Badge className="bg-primary/10 text-primary border-0 text-[10px] h-5">
                Draft
              </Badge>
            </div>
            <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest mt-0.5">
              Automated DAG Pipeline
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-9 rounded-full border-border/40 bg-card/30 font-bold px-4 hover:bg-white/5"
          >
            <Calendar size={16} className="mr-2" />
            Schedule
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-9 rounded-full border-border/40 bg-card/30 font-bold px-4 hover:bg-white/5"
          >
            <Save size={16} className="mr-2" />
            Save
          </Button>
          <Button
            size="sm"
            className="h-9 rounded-full bg-primary font-bold px-5 shadow-lg shadow-primary/20"
          >
            <Play size={16} className="mr-2" />
            Run Now
          </Button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* React Flow Canvas */}
        <div className="flex-1 relative bg-zinc-950/40">
          {/* Add Node Panel (Floating) */}
          <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
            <div className="p-1 rounded-full bg-background/80 backdrop-blur-md border border-border/40 flex items-center shadow-xl">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary"
              >
                <Plus size={18} />
              </Button>
              <div className="w-[1px] h-4 bg-border/40 mx-1" />
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-white/5"
              >
                <Search size={18} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-white/5"
              >
                <Sparkles size={18} className="text-indigo-400" />
              </Button>
            </div>
          </div>

          <ReactFlowProvider>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onNodeClick={onNodeClick}
              onPaneClick={onPaneClick}
              nodeTypes={nodeTypes}
              fitView
              snapToGrid
              snapGrid={[15, 15]}
              proOptions={{ hideAttribution: true }}
            >
              <Background color="#333" gap={20} variant="dots" />
              <Controls className="!bg-background !border-border/40 !shadow-lg rounded-xl overflow-hidden" />
            </ReactFlow>
          </ReactFlowProvider>
        </div>

        {/* Configuration Sidepanel */}
        <AnimatePresence mode="wait">
          {selectedNode ? (
            <motion.aside
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              className="w-80 border-l border-border/40 bg-card/20 backdrop-blur-xl p-6 overflow-y-auto no-scrollbar"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Settings2 size={18} />
                  </div>
                  <h2 className="font-bold text-foreground">Node Settings</h2>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedNode(null)}
                  className="h-8 w-8 rounded-full"
                >
                  <Trash2
                    size={16}
                    className="text-muted-foreground hover:text-red-500 transition-colors"
                  />
                </Button>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Node Label
                  </Label>
                  <Input
                    defaultValue={selectedNode.data.label}
                    className="bg-background/40 border-border/40"
                  />
                </div>

                <Tabs defaultValue="config" className="w-full">
                  <TabsList className="w-full bg-background/40 border border-border/20 p-1 rounded-lg">
                    <TabsTrigger
                      value="config"
                      className="flex-1 text-[10px] font-bold uppercase tracking-wider"
                    >
                      Config
                    </TabsTrigger>
                    <TabsTrigger
                      value="schema"
                      className="flex-1 text-[10px] font-bold uppercase tracking-wider"
                    >
                      Schema
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="config" className="pt-4 space-y-4">
                    <div className="p-4 rounded-xl border border-dashed border-border/40 bg-white/[0.02]">
                      <p className="text-[10px] text-muted-foreground text-center font-medium">
                        Additional configuration parameters will appear here
                        based on node type.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1 h-9 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-all font-bold text-xs">
                        <Play size={14} className="mr-2" /> Preview
                      </Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="schema" className="pt-4">
                    <div className="space-y-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-2 rounded-lg bg-background/40 border border-border/20"
                        >
                          <span className="text-xs font-medium text-foreground">
                            column_{i}
                          </span>
                          <Badge
                            variant="outline"
                            className="text-[8px] h-4 border-0 bg-white/5 uppercase"
                          >
                            String
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="pt-6 border-t border-border/20">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-indigo-500/5 border border-indigo-500/20 text-[10px] text-indigo-400 leading-relaxed font-medium">
                    <Info size={14} className="mt-0.5 shrink-0" />
                    <span>
                      AI Tip: This transformation node can be optimized using a
                      Snowflake Window function for better performance.
                    </span>
                  </div>
                </div>
              </div>
            </motion.aside>
          ) : (
            <aside className="w-80 border-l border-border/40 bg-zinc-950/10 flex flex-col items-center justify-center p-8 text-center gap-4">
              <div className="h-16 w-16 rounded-3xl bg-border/20 flex items-center justify-center text-muted-foreground/40">
                <Workflow size={32} />
              </div>
              <div>
                <p className="font-bold text-foreground">No node selected</p>
                <p className="text-xs text-muted-foreground font-medium mt-1 leading-relaxed">
                  Select a node on the canvas to configure settings, define
                  schemas, and see AI insights.
                </p>
              </div>
            </aside>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
