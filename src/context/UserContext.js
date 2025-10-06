import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [studentData, setStudentData] = useState(null);

  return (
    <UserContext.Provider value={{ studentData, setStudentData }}>
      {children}
    </UserContext.Provider>
  );
};
