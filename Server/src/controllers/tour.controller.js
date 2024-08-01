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
    //  console.log(tour)
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

const getAllTour = asyncHandler(async (req, res) => {
    const tours = await Tour.find({})
    if (tours) {
        res.status(200).json(new ApiResponse(200, { tours }, "All tours fetched successfully"))
    }
    else {
        throw new ApiError(500,"Something error occurred while fetching tours")
    }
})

const updateTour = asyncHandler(async (req, res) => {
    const tour = await Tour.findById(req.params.id)
    console.log(tour)
    if (tour) {
        tour.title = req.body.title || tour.title
        tour.description = req.body.description || tour.description
        tour.price = req.body.price || tour.price
        tour.duration = req.body.duration || tour.duration
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

const getTourById = asyncHandler(async (req, res) => {
    const tour = await Tour.findById(req.params.id)
    if (tour) {
        res.status(200) 
        .json(new ApiResponse(200, { tour },"Tour fetched successfully"));
  } else {
        throw new ApiError(401,"Tour not found");
  }
})

const deleteTour = asyncHandler(async (req, res) => {
    const tour = await Tour.findById(req.params.id)
    if (tour) {
        await Tour.deleteOne({ _id: tour._id });
        res.status(200)
            .json(new ApiResponse(200, {}, "Tour deleted sucessfully"));
    } else {
        throw new ApiError(404,"Tour not found");
    }
    
})

export {
    addTour,
    getAllTour,
    updateTour,
    getTourById,
    deleteTour,
}