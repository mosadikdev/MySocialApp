import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";


export default function Login() {
const { login } = useContext(AuthContext);
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");


const handleSubmit = async (e) => {
e.preventDefault();
await login(email, password);
};


return (
<div className="flex items-center justify-center h-screen">
<form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-8 w-96">
<h2 className="text-xl font-bold mb-4">Login</h2>
<input
type="email"
placeholder="Email"
value={email}
onChange={(e) => setEmail(e.target.value)}
className="w-full mb-3 p-2 border rounded"
/>
<input
type="password"
placeholder="Password"
value={password}
onChange={(e) => setPassword(e.target.value)}
className="w-full mb-3 p-2 border rounded"
/>
<button className="w-full bg-blue-600 text-white p-2 rounded">Login</button>
</form>
</div>
);
}