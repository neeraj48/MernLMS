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
    ],
  },
]);

function App() {
  return (
    <main>
      {/* <Header /> */}
      {/* <HeroSection /> */}
      <RouterProvider router={appRouter} />
      <Toaster />
      {/* <LoginPage /> */}
    </main>
  );
}

export default App;
