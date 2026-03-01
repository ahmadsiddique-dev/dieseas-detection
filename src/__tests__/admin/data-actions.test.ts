import { getUsers, deleteUser, getPredictions, deletePrediction } from "@/app/admin/data-actions";
import mongoose from "mongoose";
import Signup from "@/models/signup.model";
import Scan from "@/models/scan.model";
import { revalidatePath } from "next/cache";

// Mock external dependencies
jest.mock("mongoose", () => ({
    connection: { readyState: 1 },
    connect: jest.fn(),
}));

jest.mock("next/cache", () => ({
    revalidatePath: jest.fn(),
}));

jest.mock("@/models/signup.model", () => ({
    find: jest.fn(),
    findByIdAndDelete: jest.fn(),
}));

jest.mock("@/models/scan.model", () => ({
    find: jest.fn(),
    deleteMany: jest.fn(),
    findByIdAndDelete: jest.fn(),
}));

describe("Admin Data Actions", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("getUsers", () => {
        it("should return users on success", async () => {
            const mockUsers = [{ _id: "1", email: "test@test.com" }];
            const mockQuery = {
                sort: jest.fn().mockReturnThis(),
                select: jest.fn().mockReturnThis(),
                lean: jest.fn().mockResolvedValue(mockUsers),
            };
            (Signup.find as jest.Mock).mockReturnValue(mockQuery);

            const result = await getUsers();
            expect(result.success).toBe(true);
            expect(result.data).toEqual(mockUsers);
            expect(Signup.find).toHaveBeenCalled();
        });

        it("should return error on failure", async () => {
            (Signup.find as jest.Mock).mockImplementation(() => { throw new Error("DB Error"); });

            const result = await getUsers();
            expect(result.success).toBe(false);
            expect(result.error).toBe("Failed to fetch users");
        });
    });

    describe("deleteUser", () => {
        it("should delete user and associated scans", async () => {
            (Signup.findByIdAndDelete as jest.Mock).mockResolvedValue(true);
            (Scan.deleteMany as jest.Mock).mockResolvedValue(true);

            const result = await deleteUser("123");

            expect(result.success).toBe(true);
            expect(Signup.findByIdAndDelete).toHaveBeenCalledWith("123");
            expect(Scan.deleteMany).toHaveBeenCalledWith({ userId: "123" });
            expect(revalidatePath).toHaveBeenCalledWith("/admin/users");
        });
    });

    describe("getPredictions", () => {
        it("should return predictions on success", async () => {
            const mockScans = [{ _id: "1", result: { confidence: 99 } }];
            const mockQuery = {
                sort: jest.fn().mockReturnThis(),
                populate: jest.fn().mockReturnThis(),
                lean: jest.fn().mockResolvedValue(mockScans),
            };
            (Scan.find as jest.Mock).mockReturnValue(mockQuery);

            const result = await getPredictions();

            expect(result.success).toBe(true);
            expect(result.data).toEqual(mockScans);
        });
    });

    describe("deletePrediction", () => {
        it("should delete a specific prediction", async () => {
            (Scan.findByIdAndDelete as jest.Mock).mockResolvedValue(true);

            const result = await deletePrediction("456");

            expect(result.success).toBe(true);
            expect(Scan.findByIdAndDelete).toHaveBeenCalledWith("456");
            expect(revalidatePath).toHaveBeenCalledWith("/admin/predictions");
        });
    });
});
