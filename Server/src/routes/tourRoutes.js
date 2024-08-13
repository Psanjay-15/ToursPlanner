import { Router } from "express";
import {
    addTour,
    getAllTour,
    updateTour,
    getTourById,
    deleteTour,
    addReview,
    getTourReviews,
    deleteReview
} from "../controllers/tour.controller.js";
import { customRole, verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router()


router.route("/addtour").post(verifyJWT, customRole("admin"), addTour)
router.route("/alltours").get( getAllTour)
router.route("/tour-details/:id").get(getTourById)
router.route("/:id")
    // .get(verifyJWT, customRole("admin"), getTourById)
    .put(verifyJWT, customRole("admin"), updateTour)
    .delete(verifyJWT,customRole("admin"),deleteTour)

router.route("/tour-details/:tourId").post(verifyJWT,addReview).get(verifyJWT,getTourReviews)
router.route("/tours/:id/reviews/:reviewId").delete(verifyJWT,deleteReview)

export default router