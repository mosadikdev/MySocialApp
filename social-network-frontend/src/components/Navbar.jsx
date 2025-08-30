import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="font-bold text-xl">SociApp</h1>
      <div className="space-x-4">
        {user && (
          <>
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/profile" className="hover:underline">Profile</Link>
            <button onClick={logout} className="ml-4 bg-red-500 px-3 py-1 rounded">
              Log out
            </button>
          </>
        )}
        {!user && (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
