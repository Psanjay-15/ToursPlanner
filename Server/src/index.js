import app from "./app.js";
import dotenv, { config } from "dotenv";
import connectDB from "./db/index.js";
import Razorpay from "razorpay";

// dotenv.config({
//   path: "./env",
//   // path: "./.env",
// });
dotenv.config()
export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SCERET,
});
// console.log(process.env.PORT);
const port = process.env.PORT || 8000;
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server Running on port ${port} ✨`);
    });
  })
  .catch((error) => {
    console.log("Mongo Connection falied", error);
  });
