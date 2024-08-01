import { User } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from "bcrypt"

const generateAccessAndRefereshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error);

    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token"
    );
  }
};

const createUser = asyncHandler(async (req, res) => {
    const { userName, email, fullName, password } = req.body
    
    if (
    [userName, email, fullName, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(401, "All fields are required");
  }
  //   console.log(username);

  const existedUser = await User.findOne({
    $and: [{ userName }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exist");
  }
  //   console.log(existedUser);

  const user = await User.create({
    userName,
    email,
    fullName,
    password,
  });

  const { accessToken, refreshToken } = await generateAccessAndRefereshToken(
    user._id
  );
  console.log(user);

  const createdUser = await User.findById(user._id).select("-password ");

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong in creating User");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        { createdUser, accessToken, refreshToken },
        "User created successfully!"
      )
    );
})

const loginUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body
  if (!userName || !email) {
    throw new ApiError(400,"Please provide valied Username and Email")
  }
  const user = await User.findOne({
    $or :[{userName},{email}]
  })
  if (!user) {
    throw new ApiError(400,"User not registered")
  }

  const isValidPassword = await user.isPasswordCorrect(password)
  if (!isValidPassword) {
    throw new ApiError(400,"Password is Invalid")
  }

  const { accessToken, refreshToken } = await generateAccessAndRefereshToken(user._id)
  
  const loggedinUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedinUser,
          accessToken,
          refreshToken,
        },
        "User LoggedIn successfully"
      )
    );
})

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined, 
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };
  // console.log(user);
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "Current Uset Fetched Successfully"));
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user?._id);

  const isPasswordValid = await user.isPasswordCorrect(oldPassword);
  if (!isPasswordValid) {
    throw new ApiError(400, "Invalid Old Password");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password Updated Successful"));
});

const updateProfile = asyncHandler(async (req, res) => {
  const { userName,fullName, email } = req.body;

  if (!fullName || !email || !userName) {
    throw new ApiError(400, "Please enter fullName or email");
  }
  console.log(req.user._id);
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        fullName,
        email,
        userName
      },
    },
    {
      new: true,
    }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User Details Updated successfully"));
});


export {createUser,loginUser,logoutUser,getCurrentUser,changeCurrentPassword,updateProfile}