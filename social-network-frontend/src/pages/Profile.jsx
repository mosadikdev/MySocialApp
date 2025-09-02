import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const { user, logout } = useContext(AuthContext);

  if (!user) return <p className="p-4">No user logged in</p>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="flex flex-col items-center mb-4">
        {user.profile_picture ? (
          <img
            src={user.profile_picture}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover mb-2"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-2">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
        <h2 className="text-2xl font-bold">{user.name}</h2>
      </div>

      <p><b>Username:</b> {user.username}</p>
      <p><b>Email:</b> {user.email}</p>

      <button
        onClick={logout}
        className="mt-4 bg-red-600 text-white p-2 rounded w-full"
      >
        Logout
      </button>
    </div>
  );
}
