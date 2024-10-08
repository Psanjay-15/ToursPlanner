import { Router } from "express";
import {
    addTour,
    getAllTour,
    updateTour,
    getTourById,
    deleteTour,
    addReview,
    getTourReviews,
    deleteReview,
    saveTour
} from "../controllers/tour.controller.js";
import {bookTour,getBookedToursByUser} from "../controllers/booking.controller.js"
import { customRole, verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router()


router.route("/addtour").post(verifyJWT, customRole("admin"), addTour)
router.route("/alltours").get( getAllTour)
router.route("/tour-details/:id").get(getTourById)
router.route("/:id")
    .put(verifyJWT, customRole("admin"), updateTour)
    .delete(verifyJWT,customRole("admin"),deleteTour)

router.route("/tour-details/:tourId").post(verifyJWT,addReview)

router.route("/tour-details/:tourId").get(verifyJWT,getTourReviews).post(verifyJWT,saveTour)
router.route("/tours/:id/reviews/:reviewId").delete(verifyJWT,deleteReview)

router.route("/booktour").post(verifyJWT,bookTour)
router.route("/mytours").get(verifyJWT,getBookedToursByUser)
export default router