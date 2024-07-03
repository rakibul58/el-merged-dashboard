import Educate from "../pages/admin/Educate";
import Engage from "../pages/admin/Engage";
import Learn from "../pages/admin/Experiment";
import Enable from "../pages/admin/Enable";
import UserAndSettings from "../pages/admin/UserAndSettings";

export const adminRoutes = [
  {
    label: "Engage",
    path: "engage",
    element: <Engage />,
  },
  {
    label: "Educate",
    path: "educate",
    element: <Educate />,
  },
  {
    label: "Experiment",
    path: "experiment",
    element: <Learn />,
  },
  {
    label: "Enable",
    path: "enable",
    element: <Enable />,
  },
  {
    label: "User and Settings",
    path: "user-settings",
    element: <UserAndSettings />,
  },
];
