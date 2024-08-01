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
        type: Number,
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
    
}, { timestamps: true })

function arrayLimit(val) {
  return val.length <= 4;
}

export const Tour = mongoose.model("Tour",tourSchema) 