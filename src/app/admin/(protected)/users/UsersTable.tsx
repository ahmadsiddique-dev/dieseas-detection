"use client";

import { useState } from "react";
import { Users, Trash2, Calendar, Search } from "lucide-react";
import { deleteUser } from "@/app/admin/data-actions";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Mongoose document types (JSON serialized)
type UserDoc = {
    _id: string;
    email: string;
    securityQuestion?: string;
    createdAt?: string;
};

export default function UsersTable({ initialUsers }: { initialUsers: UserDoc[] }) {
    const [users, setUsers] = useState<UserDoc[]>(initialUsers);
    const [search, setSearch] = useState("");
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const filteredUsers = users.filter((u) => u.email.toLowerCase().includes(search.toLowerCase()));

    async function handleDelete(id: string) {
        if (!confirm("Are you sure you want to delete this user? All their scans will be permanentely lost.")) return;

        setDeletingId(id);
        const res = await deleteUser(id);
        if (res.success) {
            toast.success("User deleted successfully");
            setUsers((prev) => prev.filter((u) => u._id !== id));
        } else {
            toast.error(res.error || "Failed to delete user");
        }
        setDeletingId(null);
    }

    return (
        <div className="flex-1 bg-card border border-border rounded-xl flex flex-col overflow-hidden">
            {/* Toolbar */}
            <div className="p-4 border-b border-border flex items-center justify-between gap-4 bg-muted/20">
                <div className="relative max-w-sm w-full">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search users by email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9 bg-background"
                    />
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                    Total: {users.length} Users
                </div>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-auto">
                <table className="w-full text-sm text-left whitespace-nowrap">
                    <thead className="text-xs text-muted-foreground uppercase bg-muted/50 sticky top-0 z-10 border-b border-border">
                        <tr>
                            <th className="px-6 py-4 font-semibold">Email / Account</th>
                            <th className="px-6 py-4 font-semibold">Security Question</th>
                            <th className="px-6 py-4 font-semibold">Registered</th>
                            <th className="px-6 py-4 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {filteredUsers.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground">
                                    <div className="flex flex-col items-center justify-center gap-2">
                                        <Users className="w-8 h-8 opacity-20" />
                                        <p>No human users found matching criteria.</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            filteredUsers.map((user) => (
                                <tr key={user._id} className="hover:bg-muted/30 transition-colors">
                                    <td className="px-6 py-4 font-medium text-foreground">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                                                {user.email.charAt(0).toUpperCase()}
                                            </div>
                                            {user.email}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground truncate max-w-[200px]">
                                        {user.securityQuestion || "Not fully configured"}
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-3 h-3" />
                                            {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Unknown"}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                                            onClick={() => handleDelete(user._id)}
                                            disabled={deletingId === user._id}
                                        >
                                            <Trash2 className="w-4 h-4 mr-2" />
                                            {deletingId === user._id ? "Deleting..." : "Delete"}
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
