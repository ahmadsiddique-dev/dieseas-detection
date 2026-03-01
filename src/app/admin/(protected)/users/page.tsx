import { Users, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ManageUsersPage() {
    return (
        <div className="flex flex-col gap-6">
            <header className="flex items-center justify-between border-b border-border pb-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight mb-1 flex items-center gap-3">
                        <Users className="w-6 h-6 text-primary" />
                        2.1 Manage Users
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Create, update, or delete authenticated user accounts.
                    </p>
                </div>
                <Button>
                    <UserPlus className="w-4 h-4 mr-2" /> Add New User
                </Button>
            </header>

            <div className="flex-1 bg-card border border-border rounded-xl p-8 flex flex-col items-center justify-center text-center text-muted-foreground min-h-[400px]">
                <Users className="w-12 h-12 mb-4 text-border" />
                <h3 className="font-semibold text-foreground mb-1">No users found</h3>
                <p className="text-sm max-w-sm">
                    The user database is currently empty or mock data has not been loaded yet.
                </p>
            </div>
        </div>
    );
}
