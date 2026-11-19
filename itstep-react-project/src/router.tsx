import { createBrowserRouter } from "react-router";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import CoursesSearchPage from "./pages/CoursesSearchPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/dashboard",
            element: <DashboardPage />,
          },
        ],
      },
      {
        element: <PublicRoute />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: "/login",
            element: <LoginPage />,
          },
        ],
      },
      {
        path: "/search",
        element: <CoursesSearchPage />,
      },
    ],
  },
]);
