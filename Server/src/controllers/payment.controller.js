// import { Payment } from "../models/payment.model";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { instance } from "../index.js";

const book = asyncHandler(async (req, res) => {
  const options = {
    amount: Number(req.body.totalAmount * 100),
    currency: "INR",
    receipt: "order_rcptid_11",
  };
  const order = await instance.orders.create(options);
  console.log(order);
  res.status(200).json(new ApiResponse(200, { order }, "Sucess"));
});

const paymentVerification = asyncHandler(async (req, res) => {
  console.log(req.body);
  res.status(200).json(new ApiResponse(200, {}, "Success Verification"));
});

const sendKey = asyncHandler(async (req, res) => {
  // console.log(process.env.RAZORPAY_API_KEY)s
  const key = process.env.RAZORPAY_API_KEY;
  res.status(200).json(new ApiResponse(200, { key }, "key fetched"));
});

export { book, paymentVerification, sendKey };
