import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import session from "express-session"

const app = express()


app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(session({resave:false,saveUninitialized:true,secret:"secret"}))
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

export default app