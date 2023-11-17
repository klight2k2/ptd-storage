import { createContext, useEffect, useState } from "react";


export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();

  useEffect(()=>{

    const user= localStorage.getItem("user")
    console.log("auth context provider",user)
    if(user) {
      setCurrentUser(JSON.parse(user));
    }
  },[])

  return (
    <AuthContext.Provider value={{ currentUser,setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
