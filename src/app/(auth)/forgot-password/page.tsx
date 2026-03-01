"use client";

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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, MailX, ShieldQuestion, ArrowLeft, LockKeyhole, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────────

type Stage = "email" | "not-found" | "security-question" | "reset-password" | "done";

interface NotFoundResponse {
  exists: false;
}

interface SecurityQuestionResponse {
  exists: boolean | undefined;
  question: string;
}

type CheckEmailResponse = NotFoundResponse | SecurityQuestionResponse;

async function checkEmailApi(email: string): Promise<CheckEmailResponse> {
  try {
    const response = await axios.post("/api/auth/forgot-password/check-email", {
      email,
    });

    if (response.data.success) {
      toast.success(response.data.message);

      return {
        exists: true,
        question: response.data.data.securityQuestion,
      };
    } else {
      toast.error(response.data.message);

      return {
        exists: false,
        question: response.data.message,
      };
    }
  } catch (error) {
    toast.error("Failed to check email.");

    return {
      exists: false,
      question: "Something went wrong",
    };
  }
}

async function submitAnswerApi(
  email: string,
  answer: string,
): Promise<{ success: boolean }> {
  try {
    const response = await axios.post(
      "/api/auth/forgot-password/submit-answer",
      { email, answer },
    );

    if (response.data.success) {
      toast.success(response.data.message);
      localStorage.setItem("resetEmail", email);
    } else {
      toast.error(response.data.message);
    }
    return { success: response.data.success };
  } catch (error) {
    return { success: false };
  }
}

async function resetPasswordApi(
  email: string,
  password: string,
): Promise<{ success: boolean }> {
  try {
    const response = await axios.post(
      "/api/auth/forgot-password/reset-password",
      { email, password },
    );

    if (response.data.success) {
      toast.success("Password reset successfully!");
    } else {
      toast.error(response.data.message || "Failed to reset password.");
    }
    return { success: response.data.success };
  } catch (error) {
    toast.error("Something went wrong. Please try again.");
    return { success: false };
  }
}

const securityQuestions = {
  fruit: "What is your favorite fruit?",
  color: "What is your favorite color?",
  pet: "What is your favorite pet?",
  city: "In which city were you born?",
  cousin: "What is your oldest cousin's name?",
};

type SecurityQuestionKey =
  | "fruit"
  | "color"
  | "pet"
  | "city"
  | "cousin";

export default function ForgotPasswordPage() {
  const [stage, setStage] = useState<Stage>("email");
  const [email, setEmail] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState<SecurityQuestionKey>("fruit");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [answerError, setAnswerError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  
  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await checkEmailApi(email);

      if (result.exists) {
        setSecurityQuestion(result.question as SecurityQuestionKey);
        setStage("security-question");
      } else {
        setStage("not-found");
      }
    } catch {
      // handle network error if needed
    } finally {
      setLoading(false);
    }
  }

  // ── Step 2: submit security answer ──────────────────────────────────────
  async function handleAnswerSubmit(e: React.FormEvent) {
    e.preventDefault();
    setAnswerError("");
    setLoading(true);

    try {
      const result = await submitAnswerApi(email, answer);

      if (result.success) {
        setStage("reset-password");
      } else {
        setAnswerError(
          "That answer doesn't match our records. Please try again.",
        );
      }
    } catch {
      setAnswerError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // ── Step 3: reset password ────────────────────────────────────────────────
  async function handleResetSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPasswordError("");

    if (newPassword.length < 4) {
      setPasswordError("Password must be at least 4 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const result = await resetPasswordApi(email, newPassword);
      if (result.success) {
        setStage("done");
      } else {
        setPasswordError("Failed to reset password. Please try again.");
      }
    } catch {
      setPasswordError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 px-4">
      <div className="w-full max-w-md">
        {/* ── Stage: Enter Email ── */}
        {stage === "email" && (
          <Card className="shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-semibold tracking-tight">
                Forgot password
              </CardTitle>
              <CardDescription>
                Enter the email address associated with your account and we'll
                look it up.
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleEmailSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoFocus
                    disabled={loading}
                  />
                </div>
              </CardContent>

              <CardFooter className="flex pt-3 flex-col gap-3">
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Checking…
                    </>
                  ) : (
                    "Continue"
                  )}
                </Button>
                <Link
                  href="/signin"
                  className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back to login
                </Link>
              </CardFooter>
            </form>
          </Card>
        )}

        {stage === "not-found" && (
          <Card className="shadow-lg">
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-center mb-2">
                <span className="rounded-full bg-destructive/10 p-3">
                  <MailX className="h-6 w-6 text-destructive" />
                </span>
              </div>
              <CardTitle className="text-2xl font-semibold tracking-tight text-center">
                No account found
              </CardTitle>
              <CardDescription className="text-center">
                We couldn't find an account linked to{" "}
                <span className="font-medium text-foreground">{email}</span>.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Alert
                variant="destructive"
                className="bg-destructive/5 border-destructive/20"
              >
                <AlertDescription>
                  Double-check the email address or try a different one. If you
                  believe this is a mistake, please contact support.
                </AlertDescription>
              </Alert>
            </CardContent>

            <CardFooter className="flex flex-col gap-3">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setEmail("");
                  setStage("email");
                }}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Try another email
              </Button>
              <Link
                href="/signin"
                className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
              >
                Back to login
              </Link>
            </CardFooter>
          </Card>
        )}

        {stage === "security-question" && (
          <Card className="shadow-lg">
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-center mb-2">
                <span className="rounded-full bg-primary/10 p-3">
                  <ShieldQuestion className="h-6 w-6 text-primary" />
                </span>
              </div>
              <CardTitle className="text-2xl font-semibold tracking-tight text-center">
                Security question
              </CardTitle>
              <CardDescription className="text-center">
                Account found for{" "}
                <span className="font-medium text-foreground">{email}</span>.
                Please answer your security question to continue.
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleAnswerSubmit}>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-muted px-4 py-3 text-sm font-medium">
                  {securityQuestions[securityQuestion]}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="answer">Your answer</Label>
                  <Input
                    id="answer"
                    type="text"
                    placeholder="Enter your answer"
                    value={answer}
                    onChange={(e) => {
                      setAnswer(e.target.value);
                      setAnswerError("");
                    }}
                    required
                    autoFocus
                    disabled={loading}
                    aria-invalid={!!answerError}
                  />
                  {answerError && (
                    <p className="text-sm text-destructive">{answerError}</p>
                  )}
                </div>
              </CardContent>

              <CardFooter className="flex mt-3 flex-col gap-3">
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying…
                    </>
                  ) : (
                    "Verify & Reset Password"
                  )}
                </Button>
                <button
                  type="button"
                  onClick={() => setStage("email")}
                  className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Use a different email
                </button>
              </CardFooter>
            </form>
          </Card>
        )}

        {/* ── Stage: Reset Password ── */}
        {stage === "reset-password" && (
          <Card className="shadow-lg">
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-center mb-2">
                <span className="rounded-full bg-primary/10 p-3">
                  <LockKeyhole className="h-6 w-6 text-primary" />
                </span>
              </div>
              <CardTitle className="text-2xl font-semibold tracking-tight text-center">
                Set new password
              </CardTitle>
              <CardDescription className="text-center">
                Choose a new password for{" "}
                <span className="font-medium text-foreground">{email}</span>.
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleResetSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="new-password">New password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      setPasswordError("");
                    }}
                    required
                    autoFocus
                    disabled={loading}
                    minLength={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setPasswordError("");
                    }}
                    required
                    disabled={loading}
                    minLength={4}
                  />
                </div>

                {passwordError && (
                  <p className="text-sm text-destructive">{passwordError}</p>
                )}
              </CardContent>

              <CardFooter className="flex mt-3 flex-col gap-3">
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Resetting…
                    </>
                  ) : (
                    "Reset Password"
                  )}
                </Button>
                <button
                  type="button"
                  onClick={() => setStage("email")}
                  className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Start over
                </button>
              </CardFooter>
            </form>
          </Card>
        )}

        {/* ── Stage: Done ── */}
        {stage === "done" && (
          <Card className="shadow-lg">
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-center mb-2">
                <span className="rounded-full bg-green-500/10 p-3">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                </span>
              </div>
              <CardTitle className="text-2xl font-semibold tracking-tight text-center">
                Password reset!
              </CardTitle>
              <CardDescription className="text-center">
                Your password has been successfully updated. You can now sign in
                with your new password.
              </CardDescription>
            </CardHeader>

            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/signin">Sign in</Link>
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}
