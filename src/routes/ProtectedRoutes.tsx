import { Navigate, RouteObject } from "react-router-dom";
import { MainLayoutWrapper } from "./MainLayoutWrapper";
import { PlanRoutes } from "@/features/Plans";

export const ProtectedRoutes: RouteObject[] = [
  {
    path: "/app",
    element: <MainLayoutWrapper />,
    children: [
      { path: "", element: <Navigate to="/app/plans" /> }, // Redirect /app to /app/plans
      { path: "/app/plans/*", element: <PlanRoutes /> },
    ],
  },
];
