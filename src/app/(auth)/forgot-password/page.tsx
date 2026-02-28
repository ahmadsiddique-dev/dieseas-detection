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
import { Loader2, MailX, ShieldQuestion, ArrowLeft } from "lucide-react";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

type Stage = "email" | "not-found" | "security-question" | "success";

interface NotFoundResponse {
  exists: false;
}

interface SecurityQuestionResponse {
  exists: true;
  question: string;
}

type CheckEmailResponse = NotFoundResponse | SecurityQuestionResponse;

// ─── Simulated API call – replace with your real fetch ───────────────────────

async function checkEmailApi(email: string): Promise<CheckEmailResponse> {
  // TODO: replace with your actual API call
  // const res = await fetch("/api/forgot-password/check", {
  //   method: "POST",
  //   body: JSON.stringify({ email }),
  //   headers: { "Content-Type": "application/json" },
  // });
  // return res.json();

  await new Promise((r) => setTimeout(r, 1200)); // simulate network delay

  // Demo logic: emails ending in @exists.com simulate a found account
  if (email.toLowerCase().endsWith("@exists.com")) {
    return { exists: true, question: "What was the name of your first pet?" };
  }
  return { exists: false };
}

async function submitAnswerApi(
  email: string,
  answer: string
): Promise<{ success: boolean }> {
  // TODO: replace with your actual API call
  // const res = await fetch("/api/forgot-password/verify", { ... });
  await new Promise((r) => setTimeout(r, 1000));
  return { success: true };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ForgotPasswordPage() {
  const [stage, setStage] = useState<Stage>("email");
  const [email, setEmail] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [answerError, setAnswerError] = useState("");

  // ── Step 1: check email ──────────────────────────────────────────────────
  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await checkEmailApi(email);

      if (result.exists) {
        setSecurityQuestion(result.question);
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
        setStage("success");
      } else {
        setAnswerError("That answer doesn't match our records. Please try again.");
      }
    } catch {
      setAnswerError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // ─────────────────────────────────────────────────────────────────────────

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

        {/* ── Stage: Account Not Found ── */}
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
              <Alert variant="destructive" className="bg-destructive/5 border-destructive/20">
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
                href="/login"
                className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
              >
                Back to login
              </Link>
            </CardFooter>
          </Card>
        )}

        {/* ── Stage: Security Question ── */}
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
                  {securityQuestion}
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

        {/* ── Stage: Success ── */}
        {stage === "success" && (
          <Card className="shadow-lg">
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-center mb-2">
                <span className="rounded-full bg-green-500/10 p-3">
                  <svg
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
              </div>
              <CardTitle className="text-2xl font-semibold tracking-tight text-center">
                Identity verified
              </CardTitle>
              <CardDescription className="text-center">
                Your answer was correct. You can now reset your password.
              </CardDescription>
            </CardHeader>

            <CardFooter>
              <Button asChild className="w-full">
                {/* TODO: update href to your reset-password route, pass a token as needed */}
                <Link href="/reset-password">Set a new password</Link>
              </Button>
            </CardFooter>
          </Card>
        )}

      </div>
    </div>
  );
}