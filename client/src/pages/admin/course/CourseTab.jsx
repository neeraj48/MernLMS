import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

const CourseTab = () => {
  const isPublished = false;
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
    </Card>
  );
};

export default CourseTab;
