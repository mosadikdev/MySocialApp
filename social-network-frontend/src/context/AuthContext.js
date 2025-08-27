import React, { createContext, useState, useEffect } from "react";
import axios from "../utils/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const register = async (data) => {
    const res = await axios.post("/register", data);
    setUser(res.data.user);
    localStorage.setItem("token", res.data.token);
  };

  const login = async (data) => {
    const res = await axios.post("/login", data);
    setUser(res.data.user);
    localStorage.setItem("token", res.data.token);
  };

  const logout = async () => {
    await axios.post("/logout");
    setUser(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.get("/user").then(res => setUser(res.data));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};