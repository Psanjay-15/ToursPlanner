import { User } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";

const createUser = asyncHandler(async (req, res) => {
    const { userName, email, fullName, password } = req.body
    
    if (
    [userName, email, fullName, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(401, "All fields are required");
  }
  //   console.log(username);

  const existedUser = await User.findOne({
    $or: [{ userName }, { email }],
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

  // createdUser.accessToken = accessToken;
  // createdUser.refreshToken = refreshToken;

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