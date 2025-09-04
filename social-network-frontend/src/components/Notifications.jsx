import { useEffect, useState } from "react";
import axios from "../utils/axios";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifs = async () => {
    const res = await axios.get("/notifications");
    setNotifications(res.data);
  };

  const markAsRead = async (id) => {
    await axios.post(`/notifications/${id}/read`);
    fetchNotifs();
  };

  useEffect(() => {
    fetchNotifs();
  }, []);

  return (
    <div className="p-4">
      <h2 className="font-bold text-xl mb-4">Notifications</h2>
      {notifications.map(n => (
        <div key={n.id} className={`p-2 mb-2 rounded ${n.read ? "bg-gray-100" : "bg-blue-100"}`}>
          <p>{n.type === "like" && "👍 Someone liked your post"}
             {n.type === "comment" && "💬 New comment on your post"}
             {n.type === "follow" && "👤 Someone followed you"}</p>
          <button
            onClick={() => markAsRead(n.id)}
            className="text-sm text-blue-600"
          >
            Mark as read
          </button>
        </div>
      ))}
    </div>
  );
}
