import { Tour } from "../models/tour.model.js";
import { User } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const addTour = asyncHandler(async (req, res) => {
  const { title, description, price, duration, rating, coverImageUrl, photos } =
    req.body;
  if (
    !title ||
    !description ||
    !price ||
    !duration ||
    !rating ||
    !coverImageUrl ||
    !Array.isArray(photos) ||
    photos.length == 0
  ) {
    throw new ApiError(400, "Please enter all the above details");
  }

  const existedTour = await Tour.findOne({
    $and: [{ title }, { description }, { price }, { duration }],
  });

  if (existedTour) {
    throw new ApiError(400, "Tour already existed");
  }

  const tour = await Tour.create({
    title,
    description,
    price,
    duration,
    rating,
    coverImageUrl,
    photos,
  });
  //  console.log(tour)
  if (!tour) {
    throw new ApiError(500, "Tour not added");
  }
  res.status(200).json(new ApiResponse(200, tour, "Tour Added Successfully"));
});

const getAllTour = asyncHandler(async (req, res) => {
  const tours = await Tour.find({});
  // if (tours) {
    
  // } else {
  //   throw new ApiError(500, "Something error occurred while fetching tours");
  // }
  return res
      .status(200)
      .json(new ApiResponse(200, { tours }, "All tours fetched successfully"));
});

const updateTour = asyncHandler(async (req, res) => {
  const tour = await Tour.findById(req.params.id);
  // console.log(tour);
  if (tour) {
    tour.title = req.body.title || tour.title;
    tour.description = req.body.description || tour.description;
    tour.price = req.body.price || tour.price;
    tour.duration = req.body.duration || tour.duration;
    tour.rating = req.body.rating || tour.rating;
    tour.coverImageUrl = req.body.coverImageUrl || tour.coverImageUrl;
    tour.photos = req.body.photos || tour.photos;

    const newTour = await tour.save();

    res
      .status(200)
      .json(
        new ApiResponse(200, { newTour }, "Tour details updated successfully")
      );
  } else {
    throw new ApiError(401, "Something went wrong while updating the tour");
  }
});

const getTourById = asyncHandler(async (req, res) => {
  const tour = await Tour.findById(req.params.id);
  if (tour) {
    res
      .status(200)
      .json(new ApiResponse(200, { tour }, "Tour fetched successfully"));
  } else {
    throw new ApiError(401, "Tour not found");
  }
});

const deleteTour = asyncHandler(async (req, res) => {
  const tour = await Tour.findById(req.params.id);
  if (tour) {
    await Tour.deleteOne({ _id: tour._id });
    res.status(200).json(new ApiResponse(200, {}, "Tour deleted sucessfully"));
  } else {
    throw new ApiError(404, "Tour not found");
  }
});

const addReview = asyncHandler(async (req, res) => {
  try {
    const { tourId } = req.params;
    const { rating, comment } = req.body;
    // const user = req.user._id
    // console.log(user.userName);

    const tour = await Tour.findById(tourId);
    if (!tour) {
      throw new ApiError(400, "Tour not found");
    }
    const review = {
      user: req.user._id,
      name: req.user.fullName,
      rating,
      comment,
    };
    // console.log(review)
    tour.reviews.push(review);
    const averageRating =
      tour.reviews.reduce((acc, review) => acc + review.rating, 0) /
      tour.reviews.length;
    tour.ratingsAverage = averageRating;

    await tour.save();

    res
      .status(200)
      .json(new ApiResponse(200, { tour }, "Review added successfully"));
  } catch (error) {
    console.log(error.message);
    throw new ApiError(400, "Review not added");
  }
});

const getTourReviews = asyncHandler(async (req, res) => {
  try {
    const { tourId } = req.params;

    const tour = await Tour.findById(tourId).select("reviews");

    if (!tour) {
      throw new ApiError(404, "Tour not found");
    }

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { reviews: tour.reviews },
          "All reviews fetched successfully"
        )
      );
  } catch (error) {
    console.log(error.message);
    throw new ApiError(400, "Failed to fetch reviews");
  }
});

const deleteReview = asyncHandler(async (req, res) => {
  try {
    const { tourId, reviewId } = req.params;
    const tour = await Tour.findById(tourId);
    if (!tour) {
      return res.status(404).json({ error: "Tour not found" });
    }

    const review = tour.reviews.id(reviewId);
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }
    review.remove();
    const averageRating =
      tour.reviews.length > 0
        ? tour.reviews.reduce((acc, review) => acc + review.rating, 0) /
          tour.reviews.length
        : 0;
    tour.ratingsAverage = averageRating;

    await tour.save();
    res
      .status(200)
      .json(new ApiResponse(200, { tour }, "Review Deleted successfully"));
  } catch (error) {
    throw new ApiError(400, "Review not deleted");
  }
});

const saveTour = asyncHandler(async (req, res) => {
try {
    const { tourId } = req.params;
    const userId = req.user._id;
  
    const tour = await Tour.findById(tourId);
  
    if (!tourId) {
      throw new ApiError(400, "Save tour not available");
    }
  
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(400,"User not found")
    }
  
    if (user.savedTours.includes(tourId)) {
      throw new ApiError(400,"Tour already saved")
    }
  
    user.savedTours.push(tourId)
    await user.save()
  
    res.status(200).json(new ApiResponse(200,{savedTours:user.savedTours},"Tour saved successfully"))
} catch (error) {
  // throw new ApiError(400,{})
  console.log(error.message)
  
}

});

export {
  addTour,
  getAllTour,
  updateTour,
  getTourById,
  deleteTour,
  addReview,
  getTourReviews,
  deleteReview,
  saveTour
};
