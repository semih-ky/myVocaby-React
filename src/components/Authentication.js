import { useAuth } from "./context/Auth";
import { useLocation, Navigate } from "react-router-dom";

const Authentication = ({ children }) => {
  const { isLoggedIn } = useAuth();

  const location = useLocation();
  console.log(isLoggedIn);
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};
export default Authentication;
