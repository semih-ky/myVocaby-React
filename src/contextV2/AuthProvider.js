import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import isLoggedInFunct from "../utilsV2/auth.util";
import {
  postLogin,
  postSignup,
  getRefreshToken,
} from "../utilsV2/fetch.auth.api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInFunct());

  const [tknExp, setTknExp] = useState(null);

  const [error, setError] = useState(null);

  const login = async (username = "", password = "") => {
    if (!username || !password) return;
    try {
      const data = await postLogin({
        username,
        password,
      });

      if (data.token && data.expTime) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("expTime", data.expTime);

        setTknExp(data.expTime);
        setIsLoggedIn(true);
      }
      navigate(location.state?.from || "/home");
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  const signup = async (username = "", password = "", rePassword = "") => {
    try {
      const data = await postSignup({
        username,
        password,
        rePassword,
      });
      navigate("/login", {
        state: { username: username, message: "Successfully Sign Up!" },
      });
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expTime");
    setIsLoggedIn(false);
  };

  const refreshToken = (remainingTime) => {
    setTimeout(async () => {
      const tkn = localStorage.getItem("token");
      if (!tkn) return;

      try {
        const data = await getRefreshToken();

        if (data.token && data.expTime) {
          localStorage.removeItem("token");
          localStorage.removeItem("expTime");

          localStorage.setItem("token", data.token);
          localStorage.setItem("expTime", data.expTime);

          setTknExp(data.expTime);
        } else {
          setIsLoggedIn(false);
          setTknExp("");
        }
      } catch (err) {
        console.log(err);
        setError(err);
        setIsLoggedIn(false);
        setTknExp("");
      }
    }, remainingTime);
  };

  useEffect(() => {
    if (!tknExp) return;
    const remainingTime = tknExp - Date.now();
    refreshToken(remainingTime - 2000);
  }, [tknExp]);

  useEffect(() => {
    if (isLoggedIn) {
      const expTime = localStorage.getItem("expTime");
      setTknExp(expTime);
    }
  }, []);

  let value = {
    isLoggedIn,
    error,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
