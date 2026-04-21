import { createBrowserRouter } from "react-router";
import { Dashboard } from "./pages/Dashboard";
import { TPCView } from "./pages/TPCView";
import { HUEView } from "./pages/HUEView";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Dashboard,
  },
  {
    path: "/tpc",
    Component: TPCView,
  },
  {
    path: "/hue",
    Component: HUEView,
  },
]);
