import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuthPage } from "../../contextV2/AuthPageProvider";
import { useAuth } from "../../contextV2/AuthProvider";
import { regexValidator, trimmedValue } from "../../utilsV2/util";
import Input from "./Input";

const Password = () => {
  const location = useLocation();

  const { password, setPassword } = useAuthPage();
  const { error } = useAuth();

  const [isSuccess, setIsSuccess] = useState(false);
  const [helpText, setHelpText] = useState("");

  const passwordHandler = (e) => {
    let val = e.target.value;

    const isWhiteSpace = regexValidator(val, /\s/);

    if (isWhiteSpace) return;

    setPassword(val);

    if (trimmedValue(val).length < 8) {
      setIsSuccess(false);
      if (location.pathname === "/signup") {
        setHelpText("Password must at least 8 character long!");
      }
      // if location /singup
      // set help text: "Password must at least 8 character long!"
    } else {
      setIsSuccess(true);
      setHelpText("");
    }
  };

  const clearPassword = () => {
    setIsSuccess(false);
    setPassword("");
  };

  return (
    <Input
      label="Password"
      type="password"
      className={
        error || helpText
          ? "input is-danger"
          : isSuccess
          ? "input is-success"
          : "input"
      }
      iconClassName="fas fa-key"
      value={password}
      onChange={passwordHandler}
      onFocus={clearPassword}
      helpText={helpText}
    />
  );
};
export default Password;
