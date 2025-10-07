<<<<<<< HEAD
import { createContext, useState } from "react";
=======
import React, { createContext, useState } from "react";
>>>>>>> richelle

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
<<<<<<< HEAD
  const [user, setUser] = useState(null); // logged-in buyer info

  return (
    <UserContext.Provider value={{ user, setUser }}>
=======
  const [studentData, setStudentData] = useState(null);

  return (
    <UserContext.Provider value={{ studentData, setStudentData }}>
>>>>>>> richelle
      {children}
    </UserContext.Provider>
  );
};
