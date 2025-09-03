import { createContext, useState, useEffect } from "react";
import { getUserData } from "../API/auth/logedUser.api";
export let tokenContext = createContext();

export default function TokenContextProvider(props) {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);


  async function getUserDataFn(){
    const res = await getUserData()
    console.log("response userData",res);
    setUserData(res.user);
  }
  // Intializing token in state to null
  // 1- Check if token exists in localStorage
  // 2- If it does, set it in state
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserDataFn();
    }
  }, []);

  return (
    <tokenContext.Provider value={{ token, setToken, userData }}>
      {props.children}
    </tokenContext.Provider>
  );
}
