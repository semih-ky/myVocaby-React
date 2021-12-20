import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AuthPageLayout from "../../components/AuthPageLayout";
import { useAuth } from "../../components/context/Auth";
import { regexValidator, trimmedValue } from "../../util/util";

const Login = () => {
  const auth = useAuth();
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usrSuccess, setUsrSuccess] = useState(false);
  const [passSuccess, setPassSuccess] = useState(false);

  const [btnDisable, setBtnDisable] = useState(true);

  useEffect(() => {
    if (location.state) {
      if (location.state.username) {
        setUsername(location.state.username);
      }
    }
    return () => {
      auth.setSuccessMsg("");
      auth.setErrorMsg("");
    };
  }, []);

  useEffect(() => {
    if (usrSuccess && passSuccess) {
      if (auth.errorMsg) auth.setErrorMsg("");
      setBtnDisable(false);
    } else {
      setBtnDisable(true);
    }
  }, [usrSuccess, passSuccess]);

  useEffect(() => {
    if (auth.errorMsg) setBtnDisable(true);
  }, [auth.errorMsg]);

  const loginHandler = async () => {
    if (!usrSuccess || !passSuccess) return;
    await auth.login(trimmedValue(username), trimmedValue(password));
  };

  const userNameHandler = (e) => {
    let val = e.target.value;

    const isValid = regexValidator(val, /[A-Za-z0-9]/);

    if (isValid) {
      setUsername(val);
    }

    if (trimmedValue(val).length < 3) {
      setUsrSuccess(false);
    } else {
      setUsrSuccess(true);
    }
  };

  const passwordHandler = (e) => {
    let val = e.target.value;

    const isWhiteSpace = regexValidator(val, /\s/);

    if (isWhiteSpace) return;

    setPassword(val);

    if (trimmedValue(val).length < 8) {
      setPassSuccess(false);
    } else {
      setPassSuccess(true);
    }
  };

  const clearPassword = () => {
    setPassword("");
  };

  return (
    <AuthPageLayout
      infoMsg="If you don't have an account please "
      link="/signup"
      linkName="Sign Up!"
    >
      {auth.errorMsg && (
        <div className="notification is-danger is-light">{auth.errorMsg}</div>
      )}
      {auth.successMsg && (
        <div className="notification is-success is-light">
          {auth.successMsg}
        </div>
      )}
      <div className="field">
        <label className="label">Username</label>
        <div className="control has-icons-left">
          <input
            className={
              auth.errorMsg
                ? "input is-danger"
                : usrSuccess
                ? "input is-success"
                : "input"
            }
            type="text"
            value={username}
            onChange={userNameHandler}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-user"></i>
          </span>
        </div>
      </div>

      <div className="field">
        <label className="label">Password</label>
        <div className="control has-icons-left has-icons-right">
          <input
            className={
              auth.errorMsg
                ? "input is-danger"
                : passSuccess
                ? "input is-success"
                : "input"
            }
            type="password"
            value={password}
            onChange={passwordHandler}
            onFocus={clearPassword}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-key"></i>
          </span>
        </div>
      </div>
      <div className="field">
        <div className="control">
          <button
            onClick={loginHandler}
            className={
              auth.isLoading ? "button is-link is-loading" : "button is-link"
            }
            disabled={btnDisable}
          >
            Login
          </button>
        </div>
      </div>
    </AuthPageLayout>
  );
};

export default Login;
