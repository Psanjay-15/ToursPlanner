import express from "express";
import { Router } from "express";
import {
  payment,
  paymentVerification,
  sendKey,
} from "../controllers/payment.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/payment").post(payment);
router.route("/paymentverification").post(paymentVerification);
router.route("/getkey").get(sendKey);

export default router;
