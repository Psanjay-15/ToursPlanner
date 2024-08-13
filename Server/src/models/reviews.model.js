import mongoose, { model } from "mongoose";

const reviewSchema = new mongoose.Schema({}, { timestamps: true })

export const Reviews = mongoose.model("Reviews",reviewSchema)