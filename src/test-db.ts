import { connect, connection, Types } from "mongoose";
import Scan from "./models/scan.model";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/cropguard";

async function test() {
    await connect(MONGODB_URI);
    console.log("Connected");

    const count = await Scan.countDocuments();
    console.log("Total scans:", count);

    const allScans = await Scan.find().lean();
    console.log("All scans userId types:");
    allScans.forEach(s => {
        console.log(`Scan ${s._id}: userId = ${s.userId} (type: ${typeof s.userId})`);
    });

    connection.close();
}

test().catch(console.error);
