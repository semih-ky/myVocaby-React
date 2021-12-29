import { useContext, useState, createContext } from "react";
import { useAuth } from "./AuthProvider";
import { trimmedValue } from "../utilsV2/util";
const AuthPageContext = createContext(null);

export const AuthPageProvider = ({ children }) => {
  const auth = useAuth();

  const [userName, setUserName] = useState("");

  const [password, setPassword] = useState("");

  const [rePassword, setRePassword] = useState("");

  const loginHandler = async () => {
    if (!userName || !password) return;
    await auth.login(trimmedValue(userName), trimmedValue(password));
  };

  const signupHandler = async () => {
    if (!userName || !password || !rePassword) return;
    await auth.signup(
      trimmedValue(userName),
      trimmedValue(password),
      rePassword
    );
  };

  const value = {
    userName,
    password,
    rePassword,
    setUserName,
    setPassword,
    setRePassword,
    loginHandler,
    signupHandler,
  };

  return (
    <AuthPageContext.Provider value={value}>
      {children}
    </AuthPageContext.Provider>
  );
};

export const useAuthPage = () => useContext(AuthPageContext);
