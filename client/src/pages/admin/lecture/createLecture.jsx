import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCreateLectureMutation,
  useGetCourseLectureQuery,
} from "@/feature/api/lectureApi";
import { toast } from "sonner";
import Lecture from "./Lecture";

function CreateLecture() {
  // const isLoading = false;
  const navigate = useNavigate();
  const param = useParams();
  const courseId = param.courseId;
  const [lectureTitle, setLectureTitle] = useState();

  const [createLecture, { data, isLoading, isSuccess, error }] =
    useCreateLectureMutation();

  const createLectureHandler = async () => {
    await createLecture({ lectureTitle, courseId });
  };

  const {
    data: lectureData,
    isLoading: lectureLoading,
    error: lectureError,
  } = useGetCourseLectureQuery(courseId);

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "Lecture created successfully");
      // navigate(`/admin/course/${courseId}`);
    }
    if (error) {
      toast.error(error.data.message || "Failed to create Lecture");
    }
  }, [isSuccess, error]);

  console.log(lectureData);

  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">
          Lets add Lecture, add some basic lecture details for your new Lecture
        </h1>
        <p className="text-sm">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus,
          laborum!
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            placeholder="Your Lecture Name"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => navigate(`/admin/course/${courseId}`)}
          >
            Back to Course
          </Button>
          <Button disabled={isLoading} onClick={createLectureHandler}>
            {false ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Create Lecture"
            )}
          </Button>
        </div>
      </div>
      <div className="mt-16">
        {lectureLoading ? (
          <Loader2 className="h-10 w-10 animate-spin" />
        ) : lectureError ? (
          <p>Failed to load lectures</p>
        ) : lectureData?.lectures.length === 0 ? (
          <p>No lecture available</p>
        ) : (
          lectureData?.lectures.map((lecture, index) => {
            return (
              <Lecture
                key={lecture?._id}
                lecture={lecture}
                courseId={courseId}
                index={index}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

export default CreateLecture;
