import { Button } from "@/components/ui/button";
import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import CourseTab from "./CourseTab";

const EditCourse = () => {
  const navigate = useNavigate();
  const param = useParams();
  const courseId = param.courseId;

  const gotoLecture = () => {
    navigate(`/admin/course/${courseId}/lecture`);
  };
  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-bold text-xl">Add detail info about course</h1>
        <Link>
          <Button variant="link" onClick={gotoLecture()}>
            Go to lecture page
          </Button>
        </Link>
      </div>
      <CourseTab />
    </div>
  );
};

export default EditCourse;
