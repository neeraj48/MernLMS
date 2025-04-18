import "./App.css";
import LoginPage from "./pages/login";
import { Toaster } from "sonner";
// import Header from "./pages/navbar";
import HeroSection from "./pages/student/HeroSection";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Courses from "./pages/student/Courses";
import MyLearning from "./pages/student/MyLearning";
import Profile from "./pages/student/Profile";
import Sidebar from "./pages/admin/Sidebar";
import Dashboard from "./pages/admin/dashboard";
import CourseTable from "./pages/admin/course/courseTable";
import AddCourse from "./pages/admin/course/AddCourse";
import EditCourse from "./pages/admin/course/EditCourse";
import CreateLecture from "./pages/admin/lecture/createLecture";
import EditLecture from "./pages/admin/lecture/EditLecture";
import RouteGuard from "./lib/RouteGuard";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <>
              <HeroSection />
              <Courses />
          </>
        ),
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "mylearning",
        element: <MyLearning />,
      },
      {
        path: "profile",
        element: <Profile />,
      },

      {
        path: "admin",
        element: (
          // <AdminRoute>
          <Sidebar />
          // </AdminRoute>
        ),
        children: [
          {
            path: "dashboard",
            element: (
              // protected route
              <RouteGuard>
                <Dashboard />
              </RouteGuard>
            ),
          },
          {
            path: "course",
            element: <CourseTable />,
          },
          {
            path: "course/create",
            element: <AddCourse />,
          },
          {
            path: "course/:courseId",
            element: <EditCourse />,
          },
          {
            path: "course/:courseId/lecture",
            element: <CreateLecture />,
          },
          {
            path: "course/:courseId/lecture/:lectureId",
            element: <EditLecture />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <main>
      {/* <h1 className="text-4xl text-red-400 mt-40">learn react</h1> */}
      {/* <Header /> */}
      {/* <HeroSection /> */}
      {/* <RouteGuard> */}
      <RouterProvider router={appRouter} />
      {/* </RouteGuard> */}
      <Toaster />
      {/* <LoginPage /> */}
    </main>
  );
}

export default App;
