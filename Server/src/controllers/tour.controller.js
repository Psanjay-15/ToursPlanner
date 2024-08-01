import { Tour } from "../models/tour.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const addTour = asyncHandler(async (req, res) => {
    const { title, description, price, duration, rating,coverImageUrl,photos } = req.body
    if (!title || !description || !price || !duration || !rating || !coverImageUrl || !Array.isArray(photos) || photos.length == 0) {
        throw new ApiError(400,"Please enter all the above details")
    }

    const existedTour = await Tour.findOne({
        $and :[{title},{description},{price},{duration}]
    })

    if (existedTour) {
        throw new ApiError(400,"Tour already existed")
    }

    const tour = await Tour.create({
        title,
        description,
        price,
        duration,
        rating,
        coverImageUrl,
        photos
    })
     console.log(tour)
    if (!tour) {
        throw new ApiError(500,"Tour not added")
    }
    res.status(200).json(
        new ApiResponse(
            200,
            tour,
            "Tour Added Successfully"
        )
    )
})

const updateTour = asyncHandler(async (req, res) => {
    const tour = await Tour.findById(req.tour._id)

    if (tour) {
        tour.title = req.body.title || tour.title
        tour.description = req.body.description || tour.description
        tour.price = req.body.price || tour.price
        tour.duration = req.body.title || tour.title
        tour.rating = req.body.rating || tour.rating
        tour.coverImageUrl = req.body.coverImageUrl || tour.coverImageUrl
        tour.photos = req.body.photos || tour.photos

        const newTour = await tour.save()

        res.status(200).json(new ApiResponse(200, { newTour }, "Tour details updated successfully"));
    }
    else {
        throw new ApiError(401,"Something went wrong while updating the tour")
    }
})
export {addTour,updateTour}