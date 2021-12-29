import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuthPage } from "../../contextV2/AuthPageProvider";
import { useAuth } from "../../contextV2/AuthProvider";
import { regexValidator, trimmedValue } from "../../utilsV2/util";
import Input from "./Input";

const Password = () => {
  const location = useLocation();
  console.log("location", location);

  const { password, rePassword, setRePassword } = useAuthPage();
  const { error } = useAuth();

  const [isSuccess, setIsSuccess] = useState(false);
  const [helpText, setHelpText] = useState("");

  const rePasswordHandler = (e) => {
    let val = e.target.value;

    const isWhiteSpace = regexValidator(val, /\s/);

    if (isWhiteSpace) return;

    setRePassword(val);

    if (password !== val) {
      setIsSuccess(false);
      // if location /singup
      // set help text: "Re Password does not match!"
    } else {
      setIsSuccess(true);
      setHelpText("");
    }
  };

  const clearRePassword = () => {
    setIsSuccess(false);
    setRePassword("");
  };

  return (
    <Input
      label="Re Password"
      type="password"
      className={
        error || helpText
          ? "input is-danger"
          : isSuccess
          ? "input is-success"
          : "input"
      }
      iconClassName="fas fa-key"
      value={rePassword}
      onChange={rePasswordHandler}
      onFocus={clearRePassword}
      helpText={helpText}
    />
  );
};
export default Password;
