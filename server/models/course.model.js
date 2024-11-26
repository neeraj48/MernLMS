import mongoose from "mongoose";

const courseSchema = mongoose.Schema(
  {
    courseTitle: {
      type: String,
      required: true,
    },
    subTitle: {
      type: String,
      //   required: true,
    },
    description: {
      type: String,
      //   required: true,
    },
    price: {
      type: Number,
      //   required: true,
    },
    category: {
      type: String,
      required: true,
    },
    courseLevel: {
      type: String,
      enum: ["Beginner", "Medium", "Advance"],
    },
    courseThumbnail: {
      type: String,
    },
    enrolledStudent: [],
    lerctures: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lecture",
      },
    ],
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Course = mongoose.model("Course", courseSchema);
