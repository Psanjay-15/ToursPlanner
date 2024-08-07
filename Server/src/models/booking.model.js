import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    tour: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Tour"
    },
    status: {
      type: String,
      possibleValues: ["Confirmed", "Pending", "Cancelled"],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    paymentInfo: {
        type: String,
    },
    taxAmount: {
        type: Number,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    numberOfPeople: {
        type: Number,
        required:true
    }

}, { timestamps: true })

const Booking = mongoose.model("Booking",bookingSchema)