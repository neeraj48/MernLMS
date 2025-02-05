import { Course } from "../models/course.model.js";
import { Lecture } from "../models/lecture.model.js";

export const createLecture = async (req, res) => {
  try {
    const { lectureTitle } = req.body;
    const { courseId } = req.params;
    if (!lectureTitle || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Lecture title is required",
      });
    }
    // create lecture
    const lecture = await Lecture.create({
      lectureTitle,
    });
    const course = await Course.findById(courseId);
    if (course) {
      course.lectures.push(lecture._id); //push lecture id to course
      await course.save(); //save course
    }
    return res.status(201).json({
      success: true,
      message: "Lecture created successfully",
      lecture,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong!Please try again",
    });
  }
};

export const getCourseLecture = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId).populate("lectures");
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "course not found",
      });
    }
    return res.status(200).json({
      success: true,
      lectures: course.lectures,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong!Please try again",
    });
  }
};
