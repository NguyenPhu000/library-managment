import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const RequireAuth = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (user === undefined) {
    return <p>Loading...</p>;
  }

  if (user === null) {
    return (
      <Navigate
        to="http://localhost:8081/api/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return <Outlet />;
};

export default RequireAuth;
