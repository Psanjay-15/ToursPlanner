import { BookedTour } from "../models/booking.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const bookTour = async (req, res) => {
  try {
    const { tourId, totalAmount, paymentInfo, numPeople } = req.body;

    const userId = req.user._id;

    if (!tourId || !totalAmount || !paymentInfo) {
      return res
        .status(200)
        .json(new ApiResponse(200, {}, "All fields are required"));
    }

    const bookedTour = await BookedTour.create({
      user: userId,
      tour: tourId,
      totalAmount,
      paymentInfo,
      numPeople,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, { bookedTour }, "Tour booked successfully"));
  } catch (error) {
    // console.error(error);s
    res
      .status(500)
      .json({ message: "An error occurred while booking the tour" });
  }
};

const getBookedToursByUser = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log(userId);

    const bookedTours = await BookedTour.find({ user: userId } ).populate("tour");

    console.log(bookedTours);
   

    res.status(200).json(bookedTours);
  } catch (error) {
    console.error("Error fetching booked tours:", error);
    res.status(500).json({ message: "Failed to fetch booked tours." });
  }
};

export { bookTour, getBookedToursByUser };
