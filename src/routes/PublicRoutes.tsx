import { AuthRoutes } from "@/features/auth";
import { RouteObject } from "react-router-dom";

export const PublicRoutes: RouteObject[] = [
  {
    path: "/auth/*",
    element: <AuthRoutes />,
  },
];
