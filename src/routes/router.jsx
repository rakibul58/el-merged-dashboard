import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { parentRoutes } from "./parent.routes";
import { studentRoutes } from "./student.routes";
import { adminRoutes } from "./admin.routes";
import { schoolRoutes } from "./school.routes";
import Login from "../pages/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/student",
    element: <App />,
    children: studentRoutes,
  },
  {
    path: "/parent",
    element: <App />,
    children: parentRoutes,
  },
  {
    path: "/admin",
    element: <App />,
    children: adminRoutes,
  },
  {
    path: "/school",
    element: <App />,
    children: schoolRoutes,
  },
]);
