import { Router } from "express";
import { addTour,updateTour } from "../controllers/tour.controller.js";
import { customRole, verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router()


router.route("/addtour").post(verifyJWT, customRole("admin"), addTour)
router.route("/tours").put(verifyJWT,customRole("admin"),updateTour)

export default router