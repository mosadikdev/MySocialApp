import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const { user, logout } = useContext(AuthContext);

  if (!user) return <p className="p-4">No user logged in</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>

      {user.profile_picture && (
        <img
          src={user.profile_picture}
          alt="Profile"
          className="w-24 h-24 rounded-full mb-4 object-cover"
        />
      )}

      <p>
        <b>Name:</b> {user.name}
      </p>
      <p>
        <b>Username:</b> {user.username}
      </p>
      <p>
        <b>Email:</b> {user.email}
      </p>

      <button
        onClick={logout}
        className="mt-4 bg-red-600 text-white p-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}
