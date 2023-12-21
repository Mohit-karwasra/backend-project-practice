import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Middleware .use();
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

// routes import
import userRouter from "./routes/user.route.js";

// routes declaration
app.use("/api/v1/users", userRouter);

// localhost/api/v1/users --> will give control to userRouter and it will append afterwards eg localhost/api/v1/users/register

export { app };
