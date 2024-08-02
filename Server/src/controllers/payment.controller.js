import { Payment } from "../models/payment.model";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const sendRazorpayKey = asyncHandler(async (req, res) => {
    res.status(200).json({
        razorpaykey : process.env.RAZORPAY_API_KEY
    })
    
})