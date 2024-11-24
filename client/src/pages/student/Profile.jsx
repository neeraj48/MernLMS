import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CourseCard from "./course";
import { useGetUserProfileQuery } from "@/feature/api/authApi";
import { Loader2 } from "lucide-react";

const Profile = () => {
  const { data, isLoading } = useGetUserProfileQuery();

  if (isLoading)
    return (
      <Loader2 className=" text-center m-auto  my-32 h-32 w-32 animate-spin" />
    );

  const enrolledCourses = [1, 2, 3, 4];
  return (
    <div className="max-w-4xl mx-auto px-4 my-24">
      <h1 className="font-bold text-2xl md:text-left">My Profile</h1>
      <div className="flex flex-col md:flex-row items-center md:items-start my-5">
        <div className=" flex flex-col items-center">
          <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4">
            <AvatarImage
              src={data?.user?.photoUrl || "https://github.com/shadcn.png"}
              alt="@shadcn"
            />
            <AvatarFallback>MN</AvatarFallback>
          </Avatar>
        </div>
        <div className="ml-12">
          <div className="flex flex-wrap">
            <h1 className="font-semibold text-gray-900 dark:text-gray-300">
              Name:
              <span className="font-normal text-gray-700 dark:text-gray-200 ml-2">
                {data?.user?.name}
              </span>
            </h1>
          </div>
          <div className="flex flex-wrap my-1">
            <h1 className="font-semibold text-gray-900 dark:text-gray-300">
              Email:
              <span className="font-normal text-gray-700 dark:text-gray-200 ml-2">
                {data?.user?.email}
              </span>
            </h1>
          </div>
          <div className="flex flex-wrap">
            <h1 className="font-semibold text-gray-900 dark:text-gray-300">
              Role:
              <span className="font-normal text-gray-700 dark:text-gray-200 ml-2">
                {data?.user?.role.toUpperCase()}
              </span>
            </h1>
          </div>
          <div className="mt-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button>Edit Profile</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're
                    done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value="Neeraj Kumar"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="profilephoto" className="text-right">
                      Profile Photo
                    </Label>
                    <Input
                      type="file"
                      id="profilephoto"
                      accept="images/*"
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      <div>
        <h1 className="font-medium text-lg">Couses you're enrolled in</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 my-5">
          {data?.enrolledCourses?.length === 0 ? (
            <p>You have't enrolled in any course</p>
          ) : (
            data?.enrolledCourses?.map((x) => (
              <CourseCard key={x_id} course={x} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
