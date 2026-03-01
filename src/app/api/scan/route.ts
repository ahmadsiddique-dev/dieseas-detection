export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";
import dbConnection from "@/connection/dbconnection";
import cloudinary from "@/lib/cloudinary";
import Scan from "@/models/scan.model";

/* ── Zod schema for structured AI response ── */

const ScanResultSchema = z.object({
    diseaseName: z
        .string()
        .describe("Name of the detected disease, or 'Healthy' if no disease found"),
    confidence: z
        .number()
        .min(0)
        .max(100)
        .describe("Confidence percentage of the primary detection (0-100)"),
    isHealthy: z
        .boolean()
        .describe("Whether the leaf appears healthy with no disease"),
    severityLevel: z
        .number()
        .min(0)
        .max(100)
        .describe("Severity of the disease as a percentage (0-100). 0 if healthy"),
    severityLabel: z
        .string()
        .describe(
            "Human-readable severity label: 'None', 'Low', 'Moderate', 'High', or 'Critical'"
        ),
    affectedArea: z
        .number()
        .min(0)
        .max(100)
        .describe("Percentage of the leaf area that appears affected (0-100)"),
    diseaseStage: z
        .string()
        .describe(
            "Stage of the disease: 'None', 'Early', 'Mid', 'Advanced', or 'Terminal'"
        ),
    urgency: z
        .string()
        .describe("Treatment urgency: 'None', 'Low', 'Medium', 'High', or 'Critical'"),
    recoveryChance: z
        .number()
        .min(0)
        .max(100)
        .describe(
            "Estimated recovery chance with proper treatment, as a percentage (0-100)"
        ),
    diseaseProbability: z
        .array(
            z.object({
                disease: z.string().describe("Disease name"),
                confidence: z
                    .number()
                    .min(0)
                    .max(100)
                    .describe("Confidence percentage for this disease"),
            })
        )
        .min(2)
        .max(5)
        .describe(
            "Top 2-5 possible disease matches ranked by confidence. Always include 'Healthy' as one option. Confidences should sum to ~100"
        ),
    suggestions: z
        .array(
            z.object({
                title: z
                    .string()
                    .describe("Short action title, e.g. 'Apply Fungicide'"),
                text: z
                    .string()
                    .describe("Detailed recommendation in 1-2 sentences"),
            })
        )
        .min(2)
        .max(4)
        .describe(
            "2-4 actionable treatment or prevention recommendations. If healthy, provide maintenance tips"
        ),
});

/* ── System prompt for Gemini ── */

const SYSTEM_PROMPT = `You are CropGuard AI, an expert agricultural pathologist specializing in rice leaf disease detection.

Analyze the provided leaf image carefully and return a structured diagnosis. Focus specifically on rice crop diseases including but not limited to:
- Rice Blast (Magnaporthe oryzae)
- Brown Spot (Bipolaris oryzae)
- Leaf Blight / Bacterial Leaf Blight (Xanthomonas oryzae)
- Leaf Smut
- Sheath Rot
- Tungro

If the leaf appears healthy, indicate that clearly with high confidence.

Be precise with severity assessments and provide actionable treatment suggestions that a farmer could follow. Consider the visual symptoms: lesion shape, color, pattern, and distribution on the leaf.

Always provide your confidence as realistic percentages — avoid 100% unless absolutely certain. The diseaseProbability array should include the top possible diagnoses and always include a "Healthy" option.`;

/* ── POST: Upload image + Analyze with AI + Save to DB ── */

export async function POST(request: Request) {
    try {
        const cookieStore = await cookies();
        const userId = cookieStore.get("id")?.value;

        if (!userId) {
            return NextResponse.json(
                { message: "Unauthorized", success: false },
                { status: 401 }
            );
        }

        const formData = await request.formData();
        const imageFile = formData.get("image") as File | null;
        const prompt = (formData.get("prompt") as string) || "Analyze this leaf for diseases";

        if (!imageFile) {
            return NextResponse.json(
                { message: "No image provided", success: false },
                { status: 400 }
            );
        }

        // Validate file type
        if (!["image/png", "image/jpeg", "image/jpg", "image/webp"].includes(imageFile.type)) {
            return NextResponse.json(
                { message: "Only PNG, JPG, and WebP images are allowed", success: false },
                { status: 400 }
            );
        }

        // 1. Upload to Cloudinary
        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const cloudinaryResult = await new Promise<{ secure_url: string; public_id: string }>(
            (resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        folder: "cropguard-scans",
                        resource_type: "image",
                    },
                    (error, result) => {
                        if (error || !result) reject(error || new Error("Upload failed"));
                        else resolve({ secure_url: result.secure_url, public_id: result.public_id });
                    }
                );
                uploadStream.end(buffer);
            }
        );

        // 2. Analyze with Gemini AI
        const { object: scanResult } = await generateObject({
            model: google("gemini-2.5-flash-lite"),
            schema: ScanResultSchema,
            system: SYSTEM_PROMPT,
            maxRetries: 0,
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            type: "image",
                            image: new URL(cloudinaryResult.secure_url),
                        },
                        {
                            type: "text",
                            text: prompt,
                        },
                    ],
                },
            ],
        });

        // 3. Save to MongoDB
        await dbConnection();

        const scan = await Scan.create({
            userId,
            imageUrl: cloudinaryResult.secure_url,
            cloudinaryId: cloudinaryResult.public_id,
            prompt,
            result: scanResult,
        });

        return NextResponse.json(
            {
                message: "Scan completed successfully",
                success: true,
                scan: {
                    _id: scan._id,
                    imageUrl: scan.imageUrl,
                    prompt: scan.prompt,
                    result: scan.result,
                    createdAt: scan.createdAt,
                },
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Scan API error:", error);

        // Handle AI API rate limits/quota errors specifically
        if (
            error?.statusCode === 429 ||
            error?.message?.toLowerCase().includes("quota") ||
            error?.message?.toLowerCase().includes("rate limit") ||
            error?.message?.toLowerCase().includes("429") ||
            error?.lastError?.message?.toLowerCase().includes("quota")
        ) {
            return NextResponse.json(
                { message: "AI service is currently busy or out of quota. Please try again in 1 minute or check your Gemini API plan.", success: false },
                { status: 429 }
            );
        }

        return NextResponse.json(
            { message: "Failed to process scan", success: false },
            { status: 500 }
        );
    }
}

/* ── GET: Fetch scan history for the logged-in user ── */

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

        const scans = await Scan.find({ userId })
            .sort({ createdAt: -1 })
            .select("imageUrl prompt result.diseaseName result.confidence result.isHealthy createdAt")
            .lean();

        return NextResponse.json(
            { message: "History fetched", success: true, scans },
            { status: 200 }
        );
    } catch (error) {
        console.error("History API error:", error);
        return NextResponse.json(
            { message: "Failed to fetch history", success: false },
            { status: 500 }
        );
    }
}
