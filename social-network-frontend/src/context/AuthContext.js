import { createContext, useState, useEffect } from "react";
import api from "../services/api";


export const AuthContext = createContext();


export function AuthProvider({ children }) {
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);


useEffect(() => {
const savedUser = localStorage.getItem("user");
if (savedUser) setUser(JSON.parse(savedUser));
setLoading(false);
}, []);


const login = async (email, password) => {
const { data } = await api.post("/login", { email, password });
localStorage.setItem("token", data.token);
localStorage.setItem("user", JSON.stringify(data.user));
setUser(data.user);
};


const register = async (payload) => {
const { data } = await api.post("/register", payload);
localStorage.setItem("token", data.token);
localStorage.setItem("user", JSON.stringify(data.user));
setUser(data.user);
};


const logout = async () => {
await api.post("/logout");
localStorage.removeItem("token");
localStorage.removeItem("user");
setUser(null);
};


return (
<AuthContext.Provider value={{ user, login, register, logout, loading }}>
{children}
</AuthContext.Provider>
);
}