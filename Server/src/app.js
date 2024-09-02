import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import session from "express-session";
import userRoutes from "./routes/userRoutes.js";
import tourRoutes from "./routes/tourRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import passport from "passport";
import "./passport/passport.js";
import dotenv from "dotenv";


// import { use, initialize } from "passport";
dotenv.config({
  path: "./env",
  // path: "./.env",
});

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);


app.use(session({resave:false,saveUninitialized:true,secret:"secret"}))
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());


app.use("/api/v1/users", userRoutes);
app.use("/api/v1/tours", tourRoutes);
app.use("/api/v1/payments", paymentRoutes);

app.use(passport.initialize());
app.use(passport.session());

export default app;
