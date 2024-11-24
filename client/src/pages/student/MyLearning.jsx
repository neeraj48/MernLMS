import { Skeleton } from "@/components/ui/skeleton";
import Courses from "./Courses";
import CourseCard from "./course";

const MyLearning = () => {
  const leaningArr = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div className="max-w-8xl mx-auto my-24 ml-5 mr-5 px-4 md:px-0">
      <h1 className="font-bold text-2xl">MY LEARNING</h1>
      <div className="grid gap-8 grid-col-1 sm:grid-cols-1 md:grid-cols-4 lg-grid-col-6">
        {false ? (
          <MyLearningSkeleton />
        ) : leaningArr.length === 0 ? (
          <p>You are not enrolled in any course.Please enroll yourself</p>
        ) : (
          leaningArr.map((x) => <CourseCard />)
        )}
      </div>
    </div>
  );
};

export default MyLearning;

const MyLearningSkeleton = () => {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
      <Skeleton className="w-full h-36" />
      <div className="px-5 py-4 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  );
};
