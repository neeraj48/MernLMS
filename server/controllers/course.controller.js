import { Course } from "../models/course.model.js";
import { deleteUploadedMedia, uploadMedia } from "../utils/cloudinary.js";

export const createCourse = async (req, res) => {
  try {
    // console.log(req.id);
    const { courseTitle, category } = req.body;
    if (!courseTitle || !category) {
      res.status(400).json({
        success: false,
        message: "Course Title and Category are required",
      });
    }
    const course = Course.create({
      courseTitle,
      category,
      creator: req?.id,
    });
    res.status(200).json({
      success: true,
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong!Please try again",
    });
  }
};

export const getCreatorCourse = async (req, res) => {
  try {
    const creatorId = req.id;
    const course = await Course.find({ creator: creatorId });
    if (!course) {
      res.status(400).json({
        success: false,
        message: "Course not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Courses found",
      course,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong!Please try again",
    });
  }
};

export const editCourse = async (req, res) => {
  try {
    console.log(req.body);
    const courseId = req.params.courseId;
    const { courseTitle, subTitle, description, category, courseLevel, price } =
      req.body;
    const thumbnail = req.file;
    let course = await Course.findById(courseId);
    if (!course) {
      res.status(400).json({
        success: false,
        message: "Course not found",
      });
    }
    let courseThumbnail;
    if (thumbnail) {
      if (course.thumbnail) {
        const pubId = course.thumbnail.split("/").pop().split(".")[0];
        await deleteUploadedMedia(pubId);
      }
      courseThumbnail = await uploadMedia(thumbnail.path);
    }

    const updatedData = {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      price,
      courseThumbnail: courseThumbnail?.secure_url,
    };

    course = await Course.findByIdAndUpdate(courseId, updatedData, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      message: "Course updated successfully",
      course,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong!Please try again",
    });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId);
    if (!course) {
      res.status(400).json({
        success: false,
        message: "Course not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Course found",
      course,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong!Please try again",
    });
  }
};
