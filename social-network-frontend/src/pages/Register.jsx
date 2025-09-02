import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const { register } = useContext(AuthContext);
  const [form, setForm] = useState({ name: "", username: "", email: "", password: "" });
  const [profilePicture, setProfilePicture] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("username", form.username);
    formData.append("email", form.email);
    formData.append("password", form.password);
    if (profilePicture) formData.append("profile_picture", profilePicture);

    register(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto">
      <div className="mb-4">
        {preview ? (
          <img src={preview} alt="Preview" className="w-24 h-24 rounded-full object-cover mb-2" />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-2">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>

      <input type="text" placeholder="Name" value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="border p-2 w-full mb-2"/>
      <input type="text" placeholder="Username" value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
        className="border p-2 w-full mb-2"/>
      <input type="email" placeholder="Email" value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="border p-2 w-full mb-2"/>
      <input type="password" placeholder="Password" value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="border p-2 w-full mb-2"/>
      <button className="bg-green-500 text-white px-4 py-2 rounded">Register</button>
    </form>
  );
};

export default Register;
