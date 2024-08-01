import { createUser,
  loginUser, 
  logoutUser, 
  getCurrentUser, 
  changeCurrentPassword, 
  updateProfile, 
  getAllUser, 
  getUserById, 
  deleteById, 
  updateById } from "../controllers/user.controller.js"
import { Router } from "express"
import { verifyJWT,customRole } from "../middlewares/auth.middleware.js"
const router = Router()

router.route("/").post(createUser)
router.route("/auth").post(loginUser);
router.route("/logout").get(verifyJWT,logoutUser)
router.route("/profile")
    .get(verifyJWT, getCurrentUser).put(verifyJWT, updateProfile)
    .post(verifyJWT, changeCurrentPassword);


// ADMIN routes
router.route("/admin/allusers").get(verifyJWT,customRole("admin"),getAllUser)
router.route("/admin/:id")
    .get(verifyJWT, customRole("admin"), getUserById)
    .delete(verifyJWT, customRole("admin"), deleteById)
    .put(verifyJWT, customRole("admin"), updateById)

export default router