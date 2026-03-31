import { createBrowserRouter } from "react-router";
import { Dashboard } from "./pages/Dashboard";
import { TPCView } from "./pages/TPCView";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Dashboard,
  },
  {
    path: "/tpc",
    Component: TPCView,
  },
]);
