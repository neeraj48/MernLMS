import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { deleteUploadedMedia, uploadMedia } from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exist with this emailId",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return res
      .status(200)
      .json({ success: true, message: "Account created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong!Please try again",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect email or password" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect email or password" });
    }
    await generateToken(res, user, `Welcome back ${user?.name}`);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong!Please try again",
    });
  }
};

export const logout = async (_, res) => {
  try {
    res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "User log out successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong!Please try again",
    });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "Profile not found",
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong!Please try again",
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.id;
    const { name } = req.body;
    const profilePhoto = req.file.path;

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({
        message: "user not found",
        success: false,
      });
    }

    if (user?.photoUrl) {
      const publicId = user?.photoUrl.split("/").pop("").split(" ")[0]; //extract public id from photoUrl
      await deleteUploadedMedia(publicId);
    }
    const cloudResp = await uploadMedia(profilePhoto);
    const photoUrl = cloudResp?.secure_url;
    const updatedData = { name, photoUrl };
    const updateUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    }).select("-password");
    res.status(200).json({
      message: "Profile updated successfulyy",
      success: true,
      updateUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong!Please try again",
    });
  }
};
