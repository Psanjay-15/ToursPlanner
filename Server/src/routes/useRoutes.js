import { createUser,loginUser,logoutUser,getCurrentUser,updateProfile,changeCurrentPassword } from "../controllers/user.controller.js"
import express from "express"
import { Router } from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
const router = Router()

router.route("/").post(createUser)
router.route("/auth").post(loginUser);
router.route("/logout").get(verifyJWT,logoutUser)
router.route("/profile").get(verifyJWT,getCurrentUser).put(verifyJWT,updateProfile).post(verifyJWT, changeCurrentPassword);
// router.route("/changepassword").post(verifyJWT, changeCurrentPassword);

export default router