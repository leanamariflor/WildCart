import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // logged-in buyer info
  const [studentData, setStudentData] = useState(null); // student info

  return (
    <UserContext.Provider value={{ user, setUser, studentData, setStudentData }}>
      {children}
    </UserContext.Provider>
  );
};
