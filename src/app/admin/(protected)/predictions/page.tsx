import { ListTree } from "lucide-react";
import { getPredictions } from "@/app/admin/data-actions";
import PredictionsTable from "./PredictionsTable";

export default async function PredictionsPage() {
    // Server-side fetch on initial load
    const response = await getPredictions();
    const predictions = response.success ? response.data : [];

    return (
        <div className="flex flex-col gap-6 h-full w-full max-w-[100vw] overflow-hidden">
            <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0 border-b border-border pb-6 shrink-0">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight mb-1 flex items-center gap-3">
                        <ListTree className="w-6 h-6 text-purple-500" />
                        View All Predictions
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Monitor past user submissions and system diagnostics.
                    </p>
                </div>
            </header>

            <PredictionsTable initialPredictions={predictions} />
        </div>
    );
}
