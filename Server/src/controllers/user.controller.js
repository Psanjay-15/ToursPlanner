import { User } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { json } from "express";
import { now } from "mongoose";

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
  const { userName, email, fullName, password } = req.body;

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
  // console.log(user);

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
});

const loginUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;
  if (!userName || !email) {
    throw new ApiError(400, "Please provide valied Username and Email");
  }
  const user = await User.findOne({
    $and: [{ userName }, { email }],
  });
  if (!user) {
    throw new ApiError(400, "User not registered");
  }

  const isValidPassword = await user.isPasswordCorrect(password);
  if (!isValidPassword) {
    throw new ApiError(400, "Password is Invalid");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefereshToken(
    user._id
  );

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
});

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
  const { userName, fullName, email } = req.body;

  if (!fullName || !email || !userName) {
    throw new ApiError(400, "Please enter fullName or email");
  }
  // console.log(req.user._id);
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        fullName,
        email,
        userName,
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

const getAllUser = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res
      .status(200)
      .json(new ApiResponse(200, { user }, "User fetched successfully"));
  } else {
    throw new ApiError(401, "User not found");
  }
});

const deleteById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await User.deleteOne({ _id: user._id });
    res.status(200).json(new ApiResponse(200, {}, "User deleted sucessfully"));
  } else {
    throw new ApiError(404, "User not found");
  }
});

const updateById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.userName = req.body.userName || user.userName;
    user.email = req.body.email || user.email;

    const updatedUser = await user.save();

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { updatedUser },
          "User details updated successfully"
        )
      );
  } else {
    throw new ApiError(404, "User not found");
  }
});

const sendProcessingSignal = asyncHandler(async (req, res, next) => {
  //sendng signal
  res.sendStatus(200);
});

const signInWithGoogleSuccess = asyncHandler(async (req, res, next) => {
  //sending user object to frontend
  // get token from custom built method
  let myUser = req.user;
  const { accessToken, refreshToken } = await generateAccessAndRefereshToken(
    myUser._id
  );
  // const token = myUser.generateAccessAndRefereshToken();

  //set options for the cookie
  const options = {
    expires: new Date(
      Date.now() + new Number(process.env.COOKIE_TIME) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  //set password undefined for security
  myUser.password = undefined;

  //send response
  res.status(200).redirect(process.env.REDIRECT_URL + "/google/" + accessToken);
  // cookieToken(req.user, res);
});

const homeRoute = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, { success: true }, "Welcome to api"));
});

export {
  createUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  changeCurrentPassword,
  updateProfile,
  getAllUser,
  getUserById,
  deleteById,
  updateById,
  sendProcessingSignal,
  signInWithGoogleSuccess,
  homeRoute,
};
