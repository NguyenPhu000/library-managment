import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const RequireAuth = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (user === undefined) {
    return <p>Loading...</p>;
  }

  if (user === null) {
    window.location.href = "http://localhost:8081/api/login";
    return null;
  }

  return <Outlet />;
};
export default RequireAuth;
