import React, { createContext, useState } from "react";

const UserContext = createContext({});

const UserContextProvider = ({ children }) => {
  //   const [userId, setUserId] = useState("");
  //   const [userName, setUserName] = useState("");
  const [user, setUser] = useState({});
  //   const [hospitalId, setHospitalId] = useState("")

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
export { UserContext };
