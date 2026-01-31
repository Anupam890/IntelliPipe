"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/auth-client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Loader2,
  ShieldCheck,
  Timer,
  RefreshCw,
  ArrowLeft,
} from "lucide-react";
import { toast } from "sonner";

export default function VerifyEmailPage() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [resendCooldown, setResendCooldown] = useState(60);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    if (resendCooldown <= 0) {
      setIsResendDisabled(false);
      return;
    }
    const timer = setInterval(() => {
      setResendCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  async function onVerify() {
    if (otp.length !== 6) return;
    setIsLoading(true);
    setError(null);

    const { data, error } = await (authClient as any).verifyEmail({
      query: {
        token: otp,
      },
    });

    setIsLoading(false);

    if (error) {
      setError(error.message || "Invalid or expired code. Please try again.");
      toast.error("Verification failed");
      return;
    }

    toast.success("Email verified successfully!");
    router.push("/dashboard");
  }

  async function onResend() {
    setIsResending(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsResending(false);
    setResendCooldown(60);
    setIsResendDisabled(true);
    toast.success("Verification code resent to your email");
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background flex items-center justify-center p-4">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[20%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[20%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
        <div className="flex flex-col space-y-2 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 mb-2 shadow-inner">
            <ShieldCheck className="h-7 w-7 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Verify Identity
          </h1>
          <p className="text-sm text-muted-foreground max-w-[280px] mx-auto">
            We&apos;ve sent a 6-digit verification code to your email address
          </p>
        </div>

        <Card className="border-border/40 bg-card/40 backdrop-blur-xl shadow-2xl">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-lg font-medium">
              Authentication Code
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-8 py-6">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={setOtp}
              disabled={isLoading}
              autoFocus
            >
              <InputOTPGroup className="gap-2 sm:gap-3">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <InputOTPSlot
                    key={i}
                    index={i}
                    className="h-12 w-10 sm:h-14 sm:w-12 text-xl font-bold bg-background/40 border-border/60 focus:ring-primary/40 focus:border-primary/50"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>

            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/50 border border-border/40 text-sm font-medium text-muted-foreground shadow-sm">
              <Timer className="h-4 w-4 text-primary/70" />
              Expires in:{" "}
              <span className="text-foreground tabular-nums">
                {formatTime(timeLeft)}
              </span>
            </div>

            {error && (
              <div className="text-sm font-medium text-destructive bg-destructive/10 px-4 py-2 rounded-lg border border-destructive/20 w-full text-center animate-shake">
                {error}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-4 pt-0">
            <Button
              className="w-full h-11 font-medium text-base shadow-lg shadow-primary/20"
              onClick={onVerify}
              disabled={isLoading || otp.length !== 6}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Verify Now
            </Button>

            <Button
              variant="ghost"
              className="w-full h-10 text-muted-foreground hover:text-primary transition-all rounded-lg"
              onClick={onResend}
              disabled={isResendDisabled || isResending}
            >
              {isResending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw
                  className={`mr-2 h-4 w-4 ${isResendDisabled ? "opacity-50" : ""}`}
                />
              )}
              {isResendDisabled
                ? `Resend available in ${resendCooldown}s`
                : "Resend verification code"}
            </Button>
          </CardFooter>
        </Card>
        <div className="text-center">
          <Link
            href="/auth/login"
            className="flex items-center justify-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors hover:underline underline-offset-4"
          >
            <ArrowLeft size={16} />
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
