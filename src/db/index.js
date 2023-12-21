import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URI}/${DB_NAME}`
        );
        console.log(`\n MongoDB connected !! DB HOST: 
        ${connectionInstance.connection.host}`); // this here gives us connection to host value
    } catch (error) {
        console.log("MongoDB connection Failed: ", error);
        process.exit(1);
    }
};

export default connectDB;
