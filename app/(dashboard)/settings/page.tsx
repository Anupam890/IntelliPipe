"use client";

import React from "react";
import {
  User,
  Shield,
  Key,
  Bell,
  CreditCard,
  Zap,
  Trash2,
  Smartphone,
  Globe,
  Plus,
  Copy,
  CheckCircle2,
  ExternalLink,
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function SettingsPage() {
  return (
    <div className="space-y-8 pb-10 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Settings
        </h1>
        <p className="text-muted-foreground mt-1 text-sm font-medium">
          Manage your personal preferences, security, and API access.
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="h-12 w-full max-w-2xl bg-card/30 border border-border/20 p-1 rounded-xl">
          <TabsTrigger
            value="profile"
            className="flex-1 rounded-lg gap-2 font-bold text-xs uppercase tracking-wider data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <User size={14} /> Profile
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="flex-1 rounded-lg gap-2 font-bold text-xs uppercase tracking-wider data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Shield size={14} /> Security
          </TabsTrigger>
          <TabsTrigger
            value="api"
            className="flex-1 rounded-lg gap-2 font-bold text-xs uppercase tracking-wider data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Key size={14} /> API Keys
          </TabsTrigger>
          <TabsTrigger
            value="billing"
            className="flex-1 rounded-lg gap-2 font-bold text-xs uppercase tracking-wider data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <CreditCard size={14} /> Billing
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="profile"
          className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300"
        >
          <Card className="border-border/40 bg-card/30 backdrop-blur-sm">
            <CardHeader className="border-b border-border/20">
              <CardTitle className="text-lg font-bold">
                Public Profile
              </CardTitle>
              <CardDescription className="text-xs">
                How you appear to your team on InteliPipe.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-8">
              <div className="flex flex-col sm:flex-row items-center gap-8">
                <div className="relative group">
                  <Avatar className="h-24 w-24 border-2 border-primary/20 p-1">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
                      AM
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    className="h-7 w-7 rounded-full absolute bottom-0 right-0 bg-primary shadow-lg border-2 border-background"
                  >
                    <Plus size={14} />
                  </Button>
                </div>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      Full Name
                    </Label>
                    <Input
                      defaultValue="Anupam Mandal"
                      className="h-10 bg-background/40 border-border/40"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      Professional Email
                    </Label>
                    <Input
                      defaultValue="anupam@intelipipe.ai"
                      disabled
                      className="h-10 bg-zinc-950/40 border-border/40 opacity-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      Title
                    </Label>
                    <Input
                      defaultValue="Lead Data Engineer"
                      className="h-10 bg-background/40 border-border/40"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      Timezone
                    </Label>
                    <Input
                      defaultValue="GMT+05:30 (IST)"
                      className="h-10 bg-background/40 border-border/40"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-white/5 border-t border-border/20 p-4 justify-end">
              <Button className="rounded-xl bg-primary font-bold text-xs h-9 px-6 shadow-lg shadow-primary/20">
                Save Profile
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-border/40 bg-card/30 backdrop-blur-sm">
            <CardHeader className="border-b border-border/20">
              <CardTitle className="text-lg font-bold">Notifications</CardTitle>
              <CardDescription className="text-xs">
                Control when and how you receive updates.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/20">
                {[
                  {
                    label: "Pipeline Success",
                    desc: "Receive an email when a pipeline completes without errors.",
                    icon: Bell,
                  },
                  {
                    label: "Critical Failures",
                    desc: "Push notification for failed pipelines or schema drifts.",
                    icon: Zap,
                  },
                  {
                    label: "Daily Summary",
                    desc: "A morning report on your data infrastructure health.",
                    icon: Globe,
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-white/5 text-muted-foreground">
                        <item.icon size={18} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-foreground leading-none">
                          {item.label}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1.5 font-medium leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent
          value="api"
          className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300"
        >
          <Card className="border-border/40 bg-card/30 backdrop-blur-sm">
            <CardHeader className="border-b border-border/20">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-bold">
                    Personal API Keys
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Manage authentication for the InteliPipe CLI and API.
                  </CardDescription>
                </div>
                <Button
                  size="sm"
                  className="rounded-xl bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 font-bold text-[10px] uppercase tracking-widest h-8 px-4"
                >
                  Create New Key
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/20">
                {[
                  {
                    name: "Production CLI",
                    prefix: "ip_pk_••••••••••••••••",
                    date: "Jan 12, 2024",
                    status: "Active",
                  },
                  {
                    name: "Dev Testing",
                    prefix: "ip_pk_••••••••••••••••",
                    date: "Jan 30, 2024",
                    status: "Active",
                  },
                ].map((key, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-white/5 text-muted-foreground">
                        <Key size={18} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-foreground leading-none">
                          {key.name}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <code className="text-xs font-mono text-indigo-400 bg-indigo-500/5 px-2 py-0.5 rounded border border-indigo-500/10">
                            {key.prefix}
                          </code>
                          <button className="text-muted-foreground hover:text-foreground transition-all">
                            <Copy size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right hidden sm:block">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                          Created
                        </p>
                        <p className="text-xs font-semibold text-foreground">
                          {key.date}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full text-muted-foreground hover:text-red-500 hover:bg-red-500/10"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-500/20 bg-red-500/5 backdrop-blur-sm overflow-hidden border">
            <CardHeader className="border-b border-red-500/10">
              <CardTitle className="text-lg font-bold text-red-500">
                Danger Zone
              </CardTitle>
              <CardDescription className="text-xs text-red-500/70 font-medium leading-relaxed">
                Highly sensitive actions that cannot be undone. Please proceed
                with extreme caution.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-foreground">
                    Delete Account
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 font-medium leading-relaxed max-w-sm">
                    Permanently delete your personal account and all associated
                    pipeline data. This action is irreversible.
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="rounded-xl border-red-500/20 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white font-bold text-xs h-10 px-6 transition-all"
                >
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent
          value="security"
          className="animate-in fade-in slide-in-from-bottom-2 duration-300"
        >
          <Card className="border-border/40 bg-card/30 backdrop-blur-sm">
            <CardHeader className="border-b border-border/20">
              <CardTitle className="text-lg font-bold">
                Security Preferences
              </CardTitle>
              <CardDescription className="text-xs">
                Manage multi-factor authentication and session security.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {[
                {
                  label: "Two-Factor Authentication",
                  desc: "Secure your account with a time-based verification code.",
                  icon: Shield,
                  enabled: true,
                },
                {
                  label: "Device Trust",
                  desc: "Allow login only from known, recognized devices.",
                  icon: Smartphone,
                  enabled: false,
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white/5 border border-border/20"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <item.icon size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">
                        {item.label}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1 font-medium italic">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {item.enabled ? (
                      <Badge className="bg-green-500/10 text-green-500 border-0 text-[10px] font-bold uppercase tracking-widest h-6">
                        Active
                      </Badge>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 rounded-lg text-[10px] font-bold uppercase tracking-widest border-border/40"
                      >
                        Activate
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 text-[10px] font-bold text-muted-foreground"
                    >
                      Configure
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
