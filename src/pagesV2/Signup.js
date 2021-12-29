import { useAuth } from "../contextV2/AuthProvider";
import { AuthPageProvider } from "../contextV2/AuthPageProvider";
import AuthPageLayout from "../componentsV2/Auth/AuthPageLayout";
import Username from "../componentsV2/Auth/Username";
import Password from "../componentsV2/Auth/Password";
import RePassword from "../componentsV2/Auth/RePassword";
import AuthButton from "../componentsV2/Auth/AuthButton";

const Signup = () => {
  const { error } = useAuth();

  return (
    <AuthPageProvider>
      <AuthPageLayout
        infoMsg="If you have an account please "
        link="/login"
        linkName="Login!"
      >
        {error && (
          <div className="notification is-danger is-light">{error.message}</div>
        )}
        <Username />
        <Password />
        <RePassword />
        <AuthButton label="Sign Up" />
      </AuthPageLayout>
    </AuthPageProvider>
  );
};

export default Signup;
