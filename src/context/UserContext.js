import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      console.warn("Failed to parse stored user:", e);
      return null;
    }
  });

  const [studentData, setStudentData] = useState(() => {
    try {
      const raw = localStorage.getItem("studentData");
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  });

 
  useEffect(() => {
    try {
      if (user) localStorage.setItem("user", JSON.stringify(user));
      else localStorage.removeItem("user");
    } catch (e) {
      console.warn("Failed to persist user to localStorage:", e);
    }
  }, [user]);

  useEffect(() => {
    try {
      if (studentData) localStorage.setItem("studentData", JSON.stringify(studentData));
      else localStorage.removeItem("studentData");
    } catch (e) {
      console.warn("Failed to persist studentData to localStorage:", e);
    }
  }, [studentData]);

  return (
    <UserContext.Provider value={{ user, setUser, studentData, setStudentData }}>
      {children}
    </UserContext.Provider>
  );
};
