import BookedTour from "../models/booking.model.js";

const getBookedToursByUser = async (req, res) => {
  try {
    const { userId } = req.body;

    const bookedTours = await BookedTour.find({ user: userId }).populate(
      "tour"
    );

    if (!bookedTours || bookedTours.length === 0) {
      return res.status(404).json({ message: "No tours found for this user." });
    }

    res.status(200).json(bookedTours);
  } catch (error) {
    console.error("Error fetching booked tours:", error);
    res.status(500).json({ message: "Failed to fetch booked tours." });
  }
};

export { getBookedToursByUser };
