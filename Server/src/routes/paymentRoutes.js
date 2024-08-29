import express from "express";
import { Router } from "express";
import {
  book,
  paymentVerification,
  sendKey,
} from "../controllers/payment.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/book").post(book);
router.route("/paymentverification").post(paymentVerification);
router.route("/getkey").get(sendKey);

export default router;
