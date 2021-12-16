import { useAuth } from "./context/Auth";
import { Navigate } from "react-router-dom";

const RestrictedPage = ({ children }) => {
  const { user } = useAuth();

  if (user?.isLoggedIn) {
    return <Navigate to="/home" />;
  }

  return children;
};
export default RestrictedPage;
