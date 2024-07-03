import Labs from "../pages/parent/Labs";
import Lead from "../pages/parent/Lead";
import Learn from "../pages/parent/Learn";
import Leverage from "../pages/parent/Leverage";

export const parentRoutes = [
  {
    label: "Leverage",
    path: "leverage",
    element: <Leverage />,
  },
  {
    label: "Learn",
    path: "learn",
    element: <Learn />,
  },
  {
    label: "Labs",
    path: "labs",
    element: <Labs />,
  },
  {
    label: "Lead",
    path: "lead",
    element: <Lead />,
  },
];
