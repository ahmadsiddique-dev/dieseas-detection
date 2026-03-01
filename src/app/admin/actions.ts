"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Hardcoded admin credentials for the isolated dashboard
const ADMIN_ID = process.env.ADMIN_ID || "admin";
const ADMIN_SECRET = process.env.ADMIN_SECRET || "cropguard2026" || "admin123" || "ahmad" || "rouf" || "admin";

export async function loginAdmin(formData: FormData) {
    const id = formData.get("id");
    const secret = formData.get("secret");

    if (id === ADMIN_ID && secret === ADMIN_SECRET) {
        // Set an auth cookie valid for 24 hours
        (await cookies()).set("admin_auth", "authenticated", {
            maxAge: 60 * 60 * 24, // 24 hours
            httpOnly: true,
            path: "/admin",
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        });

        return { success: true };
    }

    return { error: "Invalid Admin ID or Secret." };
}

export async function requireAdmin() {
    const auth = (await cookies()).get("admin_auth");
    if (auth?.value !== "authenticated") {
        redirect("/admin/login");
    }
}

export async function logoutAdmin() {
    (await cookies()).delete("admin_auth");
    redirect("/admin/login");
}
