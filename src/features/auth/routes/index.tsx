import { Route, Routes, useNavigate } from "react-router-dom";
import { Login } from "../components/Login";
import { Signup } from "../components/Signup";

export const AuthRoutes = () => {
  const navigate = useNavigate();
  return (
    <Routes>
      <Route
        path="login"
        element={<Login onSuccess={() => navigate("/app/plans")} />}
      />
      <Route
        path="signup"
        element={<Signup onSuccess={() => navigate("/app/plans")} />}
      />
    </Routes>
  );
};
