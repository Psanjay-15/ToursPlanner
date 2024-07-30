import mongoose, { model } from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
      type: String,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      trim: true,
      // required: true,
    },
    password: {
      type: String,
      required: [true, "Please enter Valid Password"],
      minlength: [6, "Password must be atleast of 6 char"],
    },
    refreshToken: {
      type: String,
    },
    googleid: {
      type: String,
    },
}, { timestamps: true })

export const User = mongoose.model("User",userSchema)