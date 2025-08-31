import { useState, useEffect } from "react";
import axios from "../utils/axios";

export default function UsersList() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await axios.get("/users");
    setUsers(res.data);
  };

  const toggleFollow = async (user) => {
    if(user.following) {
      await axios.delete(`/users/${user.id}/follow`);
    } else {
      await axios.post(`/users/${user.id}/follow`);
    }
    fetchUsers();
  };

  useEffect(() => { fetchUsers(); }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-3">Users</h2>
      {users.map(u => (
        <div key={u.id} className="flex justify-between items-center border p-2 mb-2">
          <span>{u.username}</span>
          <button
            onClick={() => toggleFollow(u)}
            className={`px-3 py-1 rounded ${u.following ? "bg-red-500 text-white" : "bg-blue-500 text-white"}`}
          >
            {u.following ? "Unfollow" : "Follow"}
          </button>
        </div>
      ))}
    </div>
  );
}
