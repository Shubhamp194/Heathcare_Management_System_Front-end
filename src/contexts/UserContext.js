import React, { createContext, useEffect, useState } from "react";

const UserContext = createContext({});

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [globalLoader, setGlobalLoader] = useState(true);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    console.log("called");
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, globalLoader, setGlobalLoader }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
export { UserContext };
