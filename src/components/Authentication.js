import { useAuth } from "./context/Auth";
import { useLocation, Navigate } from "react-router-dom";

const Authentication = ({ children }) => {
  const { user } = useAuth();

  const location = useLocation();

  if (!user?.isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};
export default Authentication;
