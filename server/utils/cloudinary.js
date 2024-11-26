import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config({});

cloudinary.config({
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET_KEY,
  cloud_name: process.env.CLOUD_NAME,
});

export const uploadMedia = async (file) => {
  try {
    const uploadResp = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });
    return uploadResp;
  } catch (error) {
    console.log(error);
  }
};

export const deleteUploadedMedia = async (publicId) => {
  try {
    const pubId = publicId?.split(".")[0]  //removed img extention
    const resp = await cloudinary.uploader.destroy(pubId);
    // console.log("Media deleted successfully",resp);
  } catch (error) {
    console.log(error);
  }
};

export const deleteUploadedVideo = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: "video" });
  } catch (error) {
    console.log(error);
  }
};
