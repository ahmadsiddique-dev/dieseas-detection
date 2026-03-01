import { BrainCircuit, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ModelPage() {
    return (
        <div className="flex flex-col gap-6">
            <header className="flex items-center justify-between border-b border-border pb-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight mb-1 flex items-center gap-3">
                        <BrainCircuit className="w-6 h-6 text-orange-500" />
                        2.3 Update AI Model
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Deploy new YOLO weights or retrain existing phytopathology heuristics.
                    </p>
                </div>
                <Button className="bg-orange-600 hover:bg-orange-700">
                    <UploadCloud className="w-4 h-4 mr-2" /> Upload Weights
                </Button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card border border-border rounded-xl p-6">
                    <h3 className="font-bold border-b border-border pb-3 mb-4">Current Active Model</h3>
                    <div className="space-y-4 text-sm font-medium">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Architecture</span>
                            <span>CropGuard v3.0 (Vision Transformer)</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Last Updated</span>
                            <span>2026-02-15 14:30 UTC</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Accuracy</span>
                            <span className="text-green-500">97.8% Top-1</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Status</span>
                            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500" /> ACTIVE</span>
                        </div>
                    </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-8 flex flex-col items-center justify-center text-center text-muted-foreground border-dashed">
                    <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
                    <h3 className="font-semibold text-foreground mb-1">Drag & Drop new .pt or .onnx</h3>
                    <p className="text-xs w-2/3">
                        Supports PyTorch, ONNX, and TensorFlow Lite formats up to 2GB.
                    </p>
                </div>
            </div>
        </div>
    );
}
