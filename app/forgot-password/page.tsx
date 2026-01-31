"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, ArrowLeft, MailCheck } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    // Simulate sending reset link
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSent(true);
    toast.success("Reset link sent successfully");
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background flex items-center justify-center p-4">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
        <motion.div
          className="flex flex-col space-y-2 text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex justify-center mb-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="text-primary-foreground font-bold text-xl">
                  I
                </span>
              </div>
              <span className="text-2xl font-bold tracking-tight text-foreground">
                InteliPipe
              </span>
            </Link>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {isSent ? "Check your email" : "Reset password"}
          </h1>
          <p className="text-sm text-muted-foreground px-8">
            {isSent
              ? "We've sent a password reset link to your email address."
              : "Enter your email address and we'll send you a link to reset your password."}
          </p>
        </motion.div>

        <Card className="border-border/40 bg-card/40 backdrop-blur-xl shadow-2xl overflow-hidden">
          <CardContent className="pt-6">
            {!isSent ? (
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid gap-2">
                  <Label
                    htmlFor="email"
                    className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                  >
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    disabled={isLoading}
                    className="h-11 bg-background/30 border-border/50 focus:border-primary/50 transition-all"
                  />
                </div>
                <Button
                  className="w-full h-11 font-medium text-base shadow-lg shadow-primary/20"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Send Reset Link
                </Button>
              </form>
            ) : (
              <div className="flex flex-col items-center gap-6 py-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <MailCheck className="h-8 w-8 text-primary" />
                </div>
                <div className="text-center space-y-1">
                  <p className="text-sm text-foreground font-medium">
                    Reset instructions sent
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Click the link in the email to set a new password.
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="w-full h-11 border-border/50"
                  onClick={() => setIsSent(false)}
                >
                  Try another email
                </Button>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-4 border-t border-border/40 bg-white/5 py-4">
            <Link
              href="/login"
              className="flex items-center justify-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors hover:underline underline-offset-4"
            >
              <ArrowLeft size={16} />
              Return to login
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
