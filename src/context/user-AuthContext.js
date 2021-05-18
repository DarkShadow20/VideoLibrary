import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isUserLoggedIn, setLogin] = useState(false);
  const [userName, setUserName] = useState("");
  const [userData,setUserData]=useState();
  return (
    <AuthContext.Provider
      value={{
        userName,
        setUserName,
        isUserLoggedIn,
        setLogin,
        userData,
        setUserData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};