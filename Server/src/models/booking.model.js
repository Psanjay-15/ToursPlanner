import mongoose from 'mongoose'

const bookedTourSchema = new mongoose.Schema({
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    tour: { type: mongoose.Schema.Types.ObjectId, ref: "Tour", required: true },
    bookingDate: { type: Date, default: Date.now },
    status: { type: String, default: "booked" },
  },
    { timestamps: true }
}
);

const BookedTour = mongoose.model("BookedTour",bookedTourSchema)