import { Route, Routes } from "react-router-dom";

export const PlanRoutes = () => {
  return (
    <Routes>
      <Route
        path="path"
        element={<ComponentName onSuccess={() => console.log("success")} />}
      />
    </Routes>
  );
};
