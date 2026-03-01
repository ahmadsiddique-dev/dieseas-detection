import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import dbConnection from "@/connection/dbconnection";
import Signup from "@/models/signup.model";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const cookieStore = await cookies();
        const userId = cookieStore.get("id")?.value;

        if (!userId) {
            return NextResponse.json(
                { message: "Unauthorized", success: false },
                { status: 401 }
            );
        }

        await dbConnection();

        const user = await Signup.findById(userId).select("email securityQuestion").lean();

        if (!user) {
            return NextResponse.json(
                { message: "User not found", success: false },
                { status: 404 }
            );
        }

        // Extract a display name from the email (e.g. "john.doe@email.com" -> "John Doe")
        // Alternatively, since the app only collects email, just return the raw email front-part
        const emailPrefix = user.email.split("@")[0];
        const displayName = emailPrefix.charAt(0).toUpperCase() + emailPrefix.slice(1);

        return NextResponse.json(
            {
                message: "User fetched",
                success: true,
                user: {
                    email: user.email,
                    displayName: displayName
                }
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Profile API error:", error);
        return NextResponse.json(
            { message: "Failed to fetch user profile", success: false },
            { status: 500 }
        );
    }
}
