import mongoose from "mongoose";


type connectObject = {
    isConnected?: number;
}

const connection: connectObject = {};

export default async function dbConnection() {
    if (connection.isConnected) {
        return;
    }

    try {
        const db = await mongoose.connect(`${process.env.MONGODB_URI}/cropguard`);
        connection.isConnected = db.connections[0].readyState;
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit();
    }
}