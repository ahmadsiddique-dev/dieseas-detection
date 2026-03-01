import { ListTree, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PredictionsPage() {
    return (
        <div className="flex flex-col gap-6 h-full">
            <header className="flex items-center justify-between border-b border-border pb-6 shrink-0">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight mb-1 flex items-center gap-3">
                        <ListTree className="w-6 h-6 text-purple-500" />
                        2.2 View All Predictions
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Monitor past user submissions and system diagnostics.
                    </p>
                </div>
                <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" /> Export Logs
                </Button>
            </header>

            <div className="flex-1 bg-card border border-border rounded-xl p-8 flex flex-col items-center justify-center text-center text-muted-foreground min-h-[400px]">
                <ListTree className="w-12 h-12 mb-4 text-border" />
                <h3 className="font-semibold text-foreground mb-1">No prediction records</h3>
                <p className="text-sm max-w-sm">
                    No scans have been processed or logged in the system yet.
                </p>
            </div>
        </div>
    );
}
