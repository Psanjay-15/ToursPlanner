import { Router } from "express";
import {
  createUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  changeCurrentPassword,
  updateProfile,
  getAllUser,
  getUserById,
  deleteById,
  updateById,
  signInWithGoogleSuccess
} from "../controllers/user.controller.js";
import {
  bookTour,
  getBookedToursByUser,
} from "../controllers/booking.controller.js";
import { verifyJWT, customRole } from "../middlewares/auth.middleware.js";
import passport from "passport";

const router = Router();

//sign in with google
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
  (req, res) => {
    res.send("login with google");
  }
);

router
  .route("/auth/google/callback")
  .get(passport.authenticate("google"), signInWithGoogleSuccess);

router.route("/register").post(createUser);
router.route("/auth").post(loginUser);
router.route("/logout").get(verifyJWT, logoutUser);
router
  .route("/profile")
  .get(verifyJWT, getCurrentUser)
  .put(verifyJWT, updateProfile)
  .post(verifyJWT, changeCurrentPassword);

// ADMIN routes
router.route("/admin/allusers").get(verifyJWT, customRole("admin"), getAllUser);
router
  .route("/admin/:id")
  .get(verifyJWT, customRole("admin"), getUserById)
  .delete(verifyJWT, customRole("admin"), deleteById)
  .put(verifyJWT, customRole("admin"), updateById);

router.route("/book").post(verifyJWT, bookTour);
router.route("/mytours").get(verifyJWT, getBookedToursByUser);
export default router;
