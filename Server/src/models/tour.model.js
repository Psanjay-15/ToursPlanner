import mongoose from "mongoose"

const tourSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required:true
    },
    duration: {
        type: String,
        required:true        
    },
    ratingsAverage: {
        type: Number,
        default: 4.5
    },
    coverImageUrl: {
        type: String,
        required: true
    },
    photos: {
        type: [String],
        required: true,
        validate: [arrayLimit, '{PATH} exceeds the limit of 4'] 
    },
    reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
    
}, { timestamps: true })

function arrayLimit(val) {
  return val.length <= 7;
}

export const Tour = mongoose.model("Tour",tourSchema) 