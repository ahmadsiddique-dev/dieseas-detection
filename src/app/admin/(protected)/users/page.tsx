import { Users } from "lucide-react";
import { getUsers } from "@/app/admin/data-actions";
import UsersTable from "./UsersTable";

export default async function ManageUsersPage() {
    // Server-side fetch on initial load
    const response = await getUsers();
    const users = response.success ? response.data : [];

    return (
        <div className="flex flex-col gap-6 h-full">
            <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0 border-b border-border pb-6 shrink-0">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight mb-1 flex items-center gap-3">
                        <Users className="w-6 h-6 text-primary" />
                        Manage Users
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Manage authenticated user accounts.
                    </p>
                </div>
            </header>

            <UsersTable initialUsers={users} />
        </div>
    );
}
