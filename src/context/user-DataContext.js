import { createContext, useReducer } from "react";
import { userDataReducer } from "../reducer";
export const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userDataReducer, [
    {
      id:"VIDEO",
      name:"Videos",
      videos:[]
    },
    {
      id: "LIKED",
      name: "Liked",
      videos: []
    },
    {
      id: "HISTORY",
      name: "History",
      videos: []
    },
  ]);
  return (
    <UserDataContext.Provider value={{ state, dispatch }}>
      {children}
    </UserDataContext.Provider>
  );
};