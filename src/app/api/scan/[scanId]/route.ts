import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import dbConnection from "@/connection/dbconnection";
import Scan from "@/models/scan.model";

/* ── GET: Fetch a single scan by ID ── */

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ scanId: string }> }
) {
    try {
        const cookieStore = await cookies();
        const userId = cookieStore.get("id")?.value;

        if (!userId) {
            return NextResponse.json(
                { message: "Unauthorized", success: false },
                { status: 401 }
            );
        }

        const { scanId } = await params;

        await dbConnection();

        const scan = await Scan.findOne({ _id: scanId, userId }).lean();

        if (!scan) {
            return NextResponse.json(
                { message: "Scan not found", success: false },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Scan fetched", success: true, scan },
            { status: 200 }
        );
    } catch (error) {
        console.error("Single scan API error:", error);
        return NextResponse.json(
            { message: "Failed to fetch scan", success: false },
            { status: 500 }
        );
    }
}
