// require("dotenv").config({path: './env'});
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
    path: "./env",
});

connectDB()
    .then(() => {
        app.on("error", (error) => {
            console.error(error);
        });

        const port = process.env.PORT || 8000;
        app.listen(port, () => {
            console.log(` Server is running at port: ${port}`);
        });
    })
    .catch((error) => {
        console.log("MongoDb connection failed !!! ", err);
    });

/*
import express from "express";
const app = express();

(async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        app.on("error", (error) => {
            console.log("Error: ", error);
            throw error;
        });

        app.listen(process.env.PORT, () => {
            console.log(`App port is listening ${process.env.PORT}`);
        });
    } catch (error) {
        console.error("ERROR: ", error);
        throw error;
    }
})();
*/
