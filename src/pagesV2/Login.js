import { useLocation } from "react-router-dom";
import { useAuth } from "../contextV2/AuthProvider";
import { AuthPageProvider } from "../contextV2/AuthPageProvider";
import AuthPageLayout from "../componentsV2/Auth/AuthPageLayout";
import Username from "../componentsV2/Auth/Username";
import Password from "../componentsV2/Auth/Password";
import AuthButton from "../componentsV2/Auth/AuthButton";

const Login = () => {
  const location = useLocation();
  console.log("login page", location); // for success msg
  const { error } = useAuth();

  return (
    <AuthPageProvider>
      <AuthPageLayout
        infoMsg="If you don't have an account please "
        link="/signup"
        linkName="Sign Up!"
      >
        {error && (
          <div className="notification is-danger is-light">{error.message}</div>
        )}
        {/* {auth.successMsg && (
          <div className="notification is-success is-light">
            {auth.successMsg}
          </div>
        )} */}
        <Username />
        <Password />
        <AuthButton label="Login" />
      </AuthPageLayout>
    </AuthPageProvider>
  );
};

export default Login;
