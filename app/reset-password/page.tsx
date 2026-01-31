"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { Loader2, Eye, EyeOff, ShieldCheck } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (otp.length !== 6) {
      toast.error("Please enter the 6-digit reset code");
      return;
    }

    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setIsLoading(false);
      return;
    }

    // Simulate reset
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    toast.success("Password reset successfully");
    router.push("/login");
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background flex items-center justify-center p-4">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-[-10%] right-[10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
        <motion.div
          className="flex flex-col space-y-2 text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex justify-center mb-4">
            <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center shadow-inner">
              <ShieldCheck className="h-7 w-7 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Reset password
          </h1>
          <p className="text-sm text-muted-foreground px-8">
            Enter the code sent to your email and choose a new password
          </p>
        </motion.div>

        <Card className="border-border/40 bg-card/40 backdrop-blur-xl shadow-2xl overflow-hidden">
          <CardContent className="pt-6">
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="flex flex-col items-center gap-3">
                <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Reset Code
                </Label>
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={setOtp}
                  disabled={isLoading}
                >
                  <InputOTPGroup className="gap-2">
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <InputOTPSlot
                        key={i}
                        index={i}
                        className="h-12 w-10 text-lg font-bold bg-background/40 border-border/50 focus:ring-primary/40 focus:border-primary/50"
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label
                    htmlFor="password"
                    className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                  >
                    New Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      disabled={isLoading}
                      className="h-11 bg-background/30 border-border/50 focus:border-primary/50 pr-10 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                  >
                    Confirm New Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    disabled={isLoading}
                    className="h-11 bg-background/30 border-border/50 focus:border-primary/50 transition-all"
                  />
                </div>
              </div>

              <Button
                className="w-full h-11 font-medium text-base shadow-lg shadow-primary/20"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Reset Password
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 border-t border-border/40 bg-white/5 py-4">
            <div className="text-center text-sm text-muted-foreground font-medium">
              Remember your password?{" "}
              <Link
                href="/login"
                className="font-semibold text-primary hover:text-primary transition-colors underline-offset-4 hover:underline"
              >
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
