import Labs from "../pages/student/Labs";
import Lead from "../pages/student/Lead";
import Learn from "../pages/student/Learn";
import Leverage from "../pages/student/Leverage";

export const studentRoutes = [
  {
    label: 'Leverage',
    path: "leverage",
    element: <Leverage />,
  },
  {
    label: 'Learn',
    path: "learn",
    element: <Learn />,
  },
  {
    label: 'Labs',
    path: "labs",
    element: <Labs />,
  },
  {
    label: 'Lead',
    path: "lead",
    element: <Lead />,
  },
];
