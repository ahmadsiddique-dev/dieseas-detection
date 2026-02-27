import mongoose from "mongoose";


type connectObject = {
    isConnected?: number;
}

const connection: connectObject = {};

export default async function dbConnection() {
    try {
        const db = await  mongoose.connect(`${process.env.MONGODB_URI}/dumbledoor`)
        connection.isConnected = db.connections[0].readyState;

    } catch (error) {
        process.exit();
    }
}