import RichTextEditor from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@radix-ui/react-dropdown-menu";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditCourseMutation,
  useGetCourseByIdQuery,
} from "@/feature/api/courseApi";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const CourseTab = () => {
  const navigate = useNavigate();
  const params = useParams();
  const courseId = params.courseId;
  const [input, setInput] = useState({
    courseTitle: "",
    subtitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: "",
  });
  const [editCourse, { data, isLoading, error, isSuccess }] =
    useEditCourseMutation();
  const { data: getCourseByIdData, isLoading: getCourseByIdLoading } =
    useGetCourseByIdQuery(courseId);
  const course = getCourseByIdData?.course;
  useEffect(() => {
    if (course) {
      setInput({
        courseTitle: course.courseTitle,
        subtitle: course.subtitle,
        description: course.description,
        category: course.category,
        courseLevel: course.courseLevel,
        coursePrice: course.price,
        courseThumbnail: course.courseThumbnail,
      });
    }
  }, [course]);
  const isPublished = false;
  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const onSelectCategory = (value) => {
    setInput({ ...input, category: value });
  };
  const onSelectLevel = (value) => {
    setInput({ ...input, courseLevel: value });
  };
  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const setThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, courseThumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  const updateCourseHandler = async () => {
    const formdata = new FormData();
    formdata.append("courseTitle", input.courseTitle);
    formdata.append("subtitle", input.subtitle);
    formdata.append("description", input.description);
    formdata.append("category", input.category);
    formdata.append("courseLevel", input.courseLevel);
    formdata.append("price", input.coursePrice);
    formdata.append("courseThumbnail", input.courseThumbnail);
    await editCourse({ formdata, courseId });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Course updated");
      // navigate("/admin/course");
    }
    if (error) {
      toast.error(error?.message || "Something went wrong! Please try again");
    }
  }, [data, isSuccess, error]);

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Basic course info</CardTitle>
          <CardDescription>
            Make changes to your course here. click save when you are done.
          </CardDescription>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            {isPublished ? "Unpublished" : "Published"}
          </Button>
          <Button>Remove Course</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mt-5">
          <div>
            <Label>Title</Label>
            <Input
              name="courseTitle"
              placeholder="Ex- Full Stack Developer"
              type="text"
              value={input.courseTitle}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>Subtitle</Label>
            <Input
              type="text"
              name="subtitle"
              value={input.subtitle}
              onChange={changeEventHandler}
              placeholder="Ex- Become a Zero to Hero Full Stack Developer"
            />
          </div>
          <div>
            <Label>Description</Label>
            {/* <Input type="text" name="courseDesc" placeholder="Ex- This is the best online course to become a greate developer" /> */}
            <RichTextEditor input={input} setInput={setInput} />
          </div>
          <div className="flex items-center gap-5">
            <div>
              <Label>Category</Label>
              <Select onValueChange={onSelectCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    <SelectItem value="Next JS">Next JS</SelectItem>
                    <SelectItem value="Data Science">Data Science</SelectItem>
                    <SelectItem value="Frontend Development">
                      Frontend Development
                    </SelectItem>
                    <SelectItem value="Fullstack Development">
                      Fullstack Development
                    </SelectItem>
                    <SelectItem value="MERN Stack Development">
                      MERN Stack Development
                    </SelectItem>
                    <SelectItem value="Javascript">Javascript</SelectItem>
                    <SelectItem value="Python">Python</SelectItem>
                    <SelectItem value="Docker">Docker</SelectItem>
                    <SelectItem value="MongoDB">MongoDB</SelectItem>
                    <SelectItem value="HTML">HTML</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Course Level</Label>
              <Select onValueChange={onSelectLevel}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Course Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Level</SelectLabel>
                    <SelectItem value="Begginer">Begginer</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Course Price</Label>
              <Input
                type="number"
                name="coursePrice"
                value={input.coursePrice}
                onChange={changeEventHandler}
                placeholder="199"
              />
            </div>
          </div>
          <div>
            <Label>Thumbnail</Label>
            <Input
              type="file"
              accept="image/*"
              className="w-fit"
              onChange={setThumbnail}
            />
            {previewThumbnail && (
              <img
                src={previewThumbnail}
                className="e-64 my-2 h-40 w-40"
                alt="course thumbnail"
              />
            )}
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate("/admin/course")}>
              Cancel
            </Button>
            <Button disable={isLoading} onClick={updateCourseHandler}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseTab;
