import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Fallback values for environment variables
const dbHost = process.env.DB_HOST || "localhost";
const dbName = process.env.DB_NAME || "test"; // Replace "test" with your default database name if needed
const localDbUrl = `mongodb://${dbHost}:27017/${dbName}`; // Include the default MongoDB port (27017)
console.log("MongoDB URI:", localDbUrl);

// Function to connect to MongoDB
export const connectDb = async () => {
    try {
        await mongoose.connect(localDbUrl)
        console.log("Connected to DB via Mongoose");
    } catch (e) {
        console.error("Error in connecting to DB", e);
        process.exit(1); // Exit with failure
    }
};
