import { Schema, model, models, Document, Types } from "mongoose";

/* ── Sub-schemas ── */

const DiseaseProbabilitySchema = new Schema(
    {
        disease: { type: String, required: true },
        confidence: { type: Number, required: true },
    },
    { _id: false }
);

const SuggestionSchema = new Schema(
    {
        title: { type: String, required: true },
        text: { type: String, required: true },
    },
    { _id: false }
);

const ResultSchema = new Schema(
    {
        diseaseName: { type: String, required: true },
        confidence: { type: Number, required: true },
        isHealthy: { type: Boolean, required: true },
        severityLevel: { type: Number, required: true },
        severityLabel: { type: String, required: true },
        affectedArea: { type: Number, required: true },
        diseaseStage: { type: String, required: true },
        urgency: { type: String, required: true },
        recoveryChance: { type: Number, required: true },
        diseaseProbability: { type: [DiseaseProbabilitySchema], required: true },
        suggestions: { type: [SuggestionSchema], required: true },
    },
    { _id: false }
);

/* ── Main scan document ── */

export interface IScan extends Document {
    userId: Types.ObjectId;
    imageUrl: string;
    cloudinaryId: string;
    prompt: string;
    result: {
        diseaseName: string;
        confidence: number;
        isHealthy: boolean;
        severityLevel: number;
        severityLabel: string;
        affectedArea: number;
        diseaseStage: string;
        urgency: string;
        recoveryChance: number;
        diseaseProbability: { disease: string; confidence: number }[];
        suggestions: { title: string; text: string }[];
    };
    createdAt: Date;
    updatedAt: Date;
}

const ScanSchema = new Schema<IScan>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "SignIn",
            required: true,
        },
        imageUrl: { type: String, required: true },
        cloudinaryId: { type: String, required: true },
        prompt: { type: String, required: true },
        result: { type: ResultSchema, required: true },
    },
    { timestamps: true }
);

const Scan = models.Scan || model<IScan>("Scan", ScanSchema);

export default Scan;
