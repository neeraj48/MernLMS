import React, { useEffect, useState } from "react";
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
import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from "@/feature/api/authApi";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const Profile = () => {
  const [userName, setUserName] = useState();
  const [userFile, setUserFile] = useState();
  const { data, isLoading, refetch } = useGetUserProfileQuery();
  const [
    updateUser,
    {
      data: updateUserData,
      isLoading: updateIsLoading,
      error,
      isError,
      isSuccess,
    },
  ] = useUpdateUserProfileMutation();

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUserFile(file);
    }
  };

  const updateProfileHandler = async () => {
    const formData = new FormData();
    formData.append("name", userName);
    formData.append("profilePhoto", userFile);
    await updateUser(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(data?.message || "Profile updated");
    }
    if (isError) {
      toast.error(error?.message || "Failed to upload profile");
    }
  }, [error, updateUserData, isSuccess, isError]);

  if (isLoading)
    return (
      <Loader2 className=" text-center m-auto  my-32 h-32 w-32 animate-spin" />
    );

  return (
    <div className="max-w-5xl mx-auto px-4 my-24">
      <h1 className="font-bold text-2xl md:text-left">My Profile</h1>
      <div className="flex flex-col md:flex-row items-center md:items-start my-5">
        <div className=" flex flex-col items-center">
          <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4 border-2 border-blue-500">
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
          <div className="mt-4 rounded-sm">
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
                    <Label className="text-right">Name</Label>
                    <Input
                      type="text"
                      placeholder="Name"
                      value={userName}
                      className="col-span-3"
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right w-auto">Profile Photo</Label>
                    <Input
                      type="file"
                      accept="images/*"
                      className="col-span-3"
                      onChange={handlePhotoChange}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    disabled={updateIsLoading}
                    onClick={updateProfileHandler}
                    type="submit"
                  >
                    {updateIsLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      "Update"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      <div>
        <h1 className="font-medium text-lg">Courses you're enrolled in</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 my-5">
          {data?.enrolledCourses?.length > 0 ? (
            data?.enrolledCourses?.map((x) => (
              <CourseCard key={x_id} course={x} />
            ))
          ) : (
            <p className="">You have't enrolled in any course</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
