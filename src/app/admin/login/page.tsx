"use client";

import { useState } from "react";
import { loginAdmin } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Lock, ShieldCheck } from "lucide-react";

export default function AdminLogin() {
    const [isLoading, setIsLoading] = useState(false);

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const res = await loginAdmin(formData);

        if (res.error) {
            toast.error(res.error);
            setIsLoading(false);
        } else {
            // Success redirect is handled via a full page reload or router push.
            // A full reload ensures the cookie is picked up by the server on the next request.
            window.location.href = "/admin";
        }
    }

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md bg-card border border-border rounded-xl p-8 shadow-2xl relative overflow-hidden">
                {/* Decorative background glow */}
                <div className="absolute top-[-50px] right-[-50px] w-[150px] h-[150px] bg-primary/20 blur-3xl rounded-full pointer-events-none" />

                <div className="text-center mb-8 relative z-10">
                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 border border-primary/20">
                        <ShieldCheck className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-2xl font-bold text-foreground tracking-tight">System Access</h1>
                    <p className="text-sm text-muted-foreground mt-2">
                        Enter root credentials to access the Administrator Panel.
                    </p>
                </div>

                <form onSubmit={onSubmit} className="space-y-4 relative z-10">
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-foreground uppercase tracking-wider">Admin ID</label>
                        <Input
                            name="id"
                            type="text"
                            required
                            placeholder="Enter your unique ID"
                            className="bg-background/50 border-border focus-visible:ring-primary"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-foreground uppercase tracking-wider">Secret Key</label>
                        <Input
                            name="secret"
                            type="password"
                            required
                            placeholder="••••••••••••"
                            className="bg-background/50 border-border focus-visible:ring-primary"
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full mt-6 h-11 text-sm font-semibold tracking-wide"
                    >
                        {isLoading ? (
                            "Verifying..."
                        ) : (
                            <span className="flex items-center gap-2">
                                <Lock className="w-4 h-4" /> Authenticate
                            </span>
                        )}
                    </Button>
                </form>

                <p className="text-center text-xs text-muted-foreground mt-8">
                    Unauthorised access strictly prohibited.
                </p>
            </div>
        </div>
    );
}
