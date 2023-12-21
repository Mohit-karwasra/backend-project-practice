import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // extended just to get nested objects as well
app.use(express.static("public")); // assets like pdf, images etc. to keep in public

app.use(cookieParser()); // allows only server to perfrom CRUD operations on cookies in user's browser

export { app };
