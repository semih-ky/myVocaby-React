import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchData } from "../../util/util";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log("location", location);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [tknExp, setTknExp] = useState(null);

  useEffect(() => {
    if (!tknExp) return;
    const remainingTime = tknExp - Date.now();
    refreshToken(remainingTime - 2000);
  }, [tknExp]);

  const login = async (username = "", password = "") => {
    if (successMsg) setSuccessMsg("");
    if (errorMsg) setErrorMsg("");
    setIsLoading(true);
    try {
      let res = await fetchData({
        path: "/login",
        method: "POST",
        body: {
          username,
          password,
        },
      });

      let data = await res.json();
      console.log("data", data);

      if (!res.ok) {
        setIsLoading(false);
        setErrorMsg(data.message);
        return;
      }

      localStorage.setItem("token", data.token || 0);
      localStorage.setItem("expTime", data.expTime || 0);

      // const remainingTime = data.expTime - Date.now();
      // console.log(remainingTime);

      // refreshToken(remainingTime - 2000);

      setTknExp(data.expTime);

      setIsLoading(false);
      setIsLoggedIn(true);
      navigate(location.state?.from || "/home");
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  const signup = async (username = "", password = "", rePassword = "") => {
    setIsLoading(true);
    try {
      let res = await fetchData({
        path: "/signup",
        method: "POST",
        body: {
          username,
          password,
          rePassword,
        },
      });

      let data = await res.json();
      console.log("data", data);

      if (!res.ok) {
        setIsLoading(false);
        setErrorMsg(data.message);
        return;
      }

      setSuccessMsg("Successfully Sign Up!");
      setIsLoading(false);
      navigate("/login", { state: { username: username } });
    } catch (err) {
      console.log(err);
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
        let res = await fetchData({
          path: "/refresh_token",
          method: "get",
          token: tkn,
        });

        let data = await res.json();

        if (!res.ok) {
          return setErrorMsg("something went wrong!");
        }

        localStorage.removeItem("token");
        localStorage.removeItem("expTime");

        localStorage.setItem("token", data.token || 0);
        localStorage.setItem("expTime", data.expTime || 0);

        setTknExp(data.expTime);
      } catch (err) {
        console.log(err);
      }
    }, remainingTime);
  };

  useEffect(() => {
    console.log("Look at the user is logged in");

    const tkn = localStorage.getItem("token");
    const expTime = localStorage.getItem("expTime");

    if (!tkn || !expTime) return;

    const currTime = Date.now();
    if (currTime > expTime) return;

    console.log("yes");
    setIsLoggedIn(true);

    // const remainingTime = expTime - Date.now();
    // refreshToken(remainingTime - 2000);
    setTknExp(expTime);
  }, []);

  let value = {
    isLoggedIn,
    errorMsg,
    successMsg,
    isLoading,
    setSuccessMsg,
    setErrorMsg,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
