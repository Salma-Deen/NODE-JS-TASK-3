import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME;

const localDbUrl = `mongodb://${dbHost}/${dbName}`;

export const connectDb = async () => {
    try {
        await mongoose.connect(localDbUrl);
        console.log("Connected to DB via Mongoose");
    }
    catch (e) {
        console.log("Error in connecting", e);
        process.exit(1);
    }
};
