import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (username = "", password = "") => {};

  const signup = (username = "", password = "", rePassword = "") => {};

  const logout = () => {};

  let value = { user, login, signup, logout };

  useEffect(() => {
    console.log("Look at the user is logged in");
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
