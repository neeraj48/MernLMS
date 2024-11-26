import { Course } from "../models/course.model.js";

export const createCourse = async (req, res) => {
  try {
    console.log(req.id);
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
