import { Router } from "express";
import {
    addTour,
    getAllTour,
    updateTour,
    getTourById,
    deleteTour
} from "../controllers/tour.controller.js";
import { customRole, verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router()


router.route("/addtour").post(verifyJWT, customRole("admin"), addTour)
router.route("/alltours").get(verifyJWT, customRole("admin"), getAllTour)
router.route("/:id")
    .get(verifyJWT, customRole("admin"), getTourById)
    .put(verifyJWT, customRole("admin"), updateTour)
    .delete(verifyJWT,customRole("admin"),deleteTour)


export default router