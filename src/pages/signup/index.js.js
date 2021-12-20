import { useState, useEffect } from "react";
import AuthPageLayout from "../../components/AuthPageLayout";
import { useAuth } from "../../components/context/Auth";
import { regexValidator, trimmedValue } from "../../util/util";

const Signup = () => {
  const auth = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const [usrNameError, setUsrNameError] = useState("");
  const [passError, setPassError] = useState("");
  const [rePassError, setRePassError] = useState("");

  const [usrSuccess, setUsrSuccess] = useState(false);
  const [passSuccess, setPassSuccess] = useState(false);
  const [rePassSuccess, setRePassSuccess] = useState(false);

  const [btnDisable, setBtnDisable] = useState(true);

  useEffect(() => {
    return () => {
      auth.setSuccessMsg("");
      auth.setErrorMsg("");
    };
  }, []);

  useEffect(() => {
    if (usrSuccess && passSuccess && rePassSuccess) {
      if (auth.errorMsg) auth.setErrorMsg("");
      setBtnDisable(false);
    } else {
      setBtnDisable(true);
    }
  }, [usrSuccess, passSuccess, rePassSuccess]);

  useEffect(() => {
    if (auth.errorMsg) setBtnDisable(true);
  }, [auth.errorMsg]);

  const signupHandler = async () => {
    if (!usrSuccess || !passSuccess || !rePassSuccess) return;

    await auth.signup(
      trimmedValue(username),
      trimmedValue(password),
      rePassword
    );
  };

  const userNameHandler = (e) => {
    let val = e.target.value;

    const isValid = regexValidator(val, /[A-Za-z0-9]/);

    if (isValid) {
      setUsername(val);
    }

    if (trimmedValue(val).length < 3) {
      setUsrSuccess(false);
      setUsrNameError("Username must at least 3 character long!");
    } else {
      setUsrNameError("");
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
      setPassError("Password must 8 character long!");
    } else {
      setPassError("");
      setPassSuccess(true);
    }
  };

  const rePasswordHandler = (e) => {
    let val = e.target.value;

    const isWhiteSpace = regexValidator(val, /\s/);

    if (isWhiteSpace) return;

    setRePassword(val);

    if (password !== val) {
      setRePassSuccess(false);
      setRePassError("Re Password does not match!");
    } else {
      setRePassError("");
      setRePassSuccess(true);
    }
  };

  const clearPassword = () => {
    setPassword("");
  };

  const clearRePassword = () => {
    setRePassword("");
  };

  return (
    <AuthPageLayout
      infoMsg="If you have an account please "
      link="/login"
      linkName="Login!"
    >
      {auth.errorMsg && (
        <div className="notification is-danger is-light">{auth.errorMsg}</div>
      )}
      <div className="field">
        <label className="label">Username</label>
        <div className="control has-icons-left">
          <input
            className={
              auth.errorMsg || usrNameError
                ? "input is-danger"
                : usrSuccess
                ? "input is-success"
                : "input"
            }
            id="username"
            type="text"
            value={username}
            onChange={userNameHandler}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-user"></i>
          </span>
        </div>
        {usrNameError && <p className="help is-danger">{usrNameError}</p>}
      </div>

      <div className="field">
        <label className="label">Password</label>
        <div className="control has-icons-left has-icons-right">
          <input
            className={
              auth.errorMsg || passError
                ? "input is-danger"
                : passSuccess
                ? "input is-success"
                : "input"
            }
            id="password"
            type="password"
            value={password}
            onChange={passwordHandler}
            onFocus={clearPassword}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-key"></i>
          </span>
        </div>
        {passError && <p className="help is-danger">{passError}</p>}
      </div>

      <div className="field">
        <label className="label">Re-Password</label>
        <div className="control has-icons-left has-icons-right">
          <input
            className={
              auth.errorMsg || rePassError
                ? "input is-danger"
                : rePassSuccess
                ? "input is-success"
                : "input"
            }
            id="rePassword"
            type="password"
            value={rePassword}
            onChange={rePasswordHandler}
            onFocus={clearRePassword}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-key"></i>
          </span>
        </div>
        {rePassError && <p className="help is-danger">{rePassError}</p>}
      </div>
      <div className="field">
        <div className="control">
          <button
            onClick={signupHandler}
            className={
              auth.isLoading ? "button is-link is-loading" : "button is-link"
            }
            disabled={btnDisable}
          >
            Sign Up
          </button>
        </div>
      </div>
    </AuthPageLayout>
  );
};

export default Signup;
