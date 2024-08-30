// import { Payment } from "../models/payment.model";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { instance } from "../index.js";
import { json } from "express";
import { Payment } from "../models/payment.model.js";

const payment = asyncHandler(async (req, res) => {
  const options = {
    amount: Number(req.body.totalAmount * 100),
    currency: "INR",
    receipt: "order_rcptid_11",
  };
  const order = await instance.orders.create(options);
  // console.log(order);
  res.status(200).json(new ApiResponse(200, { order }, "Sucess"));
});

const paymentVerification = asyncHandler(async (req, res) => {
  // console.log(req.body);
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Database comes here

    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    res.redirect(
      `http://localhost:8000/paymentsuccess?reference=${razorpay_payment_id}`
    );
  } else {
    res.status(400).json({
      success: false,
    });
  }
});

const sendKey = asyncHandler(async (req, res) => {
  // console.log(process.env.RAZORPAY_API_KEY)s
  const key = process.env.RAZORPAY_API_KEY;
  res.status(200).json(new ApiResponse(200, { key }, "key fetched"));
});

export { payment, paymentVerification, sendKey };
