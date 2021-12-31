import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuthPage } from "../../contextV2/AuthPageProvider";
import { useAuth } from "../../contextV2/AuthProvider";
import { regexValidator, trimmedValue } from "../../utilsV2/util";
import Input from "./Input";

const Username = () => {
  const location = useLocation();

  const { userName, setUserName } = useAuthPage();

  const { error } = useAuth();

  const [isSuccess, setIsSuccess] = useState(false);
  const [helpText, setHelpText] = useState("");

  const userNameHandler = (e) => {
    let val = e.target.value;

    const isValid = regexValidator(val, /[A-Za-z0-9]/);

    if (isValid) {
      setUserName(val);
    }

    if (trimmedValue(val).length < 3) {
      setIsSuccess(false);
      if (location.pathname === "/signup") {
        setHelpText("Username must at least 3 character long!");
      }
      // if location /singup
      // set help text: "Username must at least 3 character long!"
    } else {
      setIsSuccess(true);
      setHelpText("");
    }
  };

  useEffect(() => {
    if (location.state?.username) {
      setUserName(location.state?.username);
      setIsSuccess(true);
    }
  }, []);

  return (
    <Input
      label="Username"
      type="text"
      className={
        error ? "input is-danger" : isSuccess ? "input is-success" : "input"
      }
      iconClassName="fas fa-user"
      value={userName}
      onChange={userNameHandler}
      helpText={helpText}
    />
  );
};
export default Username;
