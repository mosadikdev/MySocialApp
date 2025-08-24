import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";


export default function Register() {
const { register } = useContext(AuthContext);
const [form, setForm] = useState({ name: "", username: "", email: "", password: "", password_confirmation: "" });


const handleChange = (e) => {
setForm({ ...form, [e.target.name]: e.target.value });
};


const handleSubmit = async (e) => {
e.preventDefault();
await register(form);
};


return (
<div className="flex items-center justify-center h-screen">
<form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-8 w-96">
<h2 className="text-xl font-bold mb-4">Register</h2>
{Object.keys(form).map((field) => (
<input
key={field}
type={field.includes("password") ? "password" : "text"}
name={field}
placeholder={field}
value={form[field]}
onChange={handleChange}
className="w-full mb-3 p-2 border rounded"
/>
))}
<button className="w-full bg-green-600 text-white p-2 rounded">Register</button>
</form>
</div>
);
}