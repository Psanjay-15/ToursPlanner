import mongoose from "mongoose";

const bookedTourSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tour: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tour",
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    bookingDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const BookedTour = mongoose.model("BookedTour", bookedTourSchema);
