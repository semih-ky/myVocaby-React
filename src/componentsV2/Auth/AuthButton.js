import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../contextV2/AuthProvider";
import { useAuthPage } from "../../contextV2/AuthPageProvider";

const AuthButton = ({ label }) => {
  const location = useLocation();
  console.log("authbutton location", location); // for login/signup handler

  const { isLoading } = useAuth();
  const { userName, password, rePassword, loginHandler, signupHandler } =
    useAuthPage();

  const [isDisable, setIsDisable] = useState(true);

  useEffect(() => {
    if (userName.length > 2 && password.length > 7) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  }, [userName, password, rePassword]);

  return (
    <div className="field">
      <div className="control">
        <button
          onClick={label === "Login" ? loginHandler : signupHandler}
          className={isLoading ? "button is-link is-loading" : "button is-link"}
          disabled={isDisable}
        >
          {label}
        </button>
      </div>
    </div>
  );
};
export default AuthButton;
