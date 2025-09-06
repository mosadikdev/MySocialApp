import { useState, useEffect } from "react";
import axios from "../utils/axios";

export default function Messages({ userId }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const fetchMessages = async () => {
    const res = await axios.get(`/messages/${userId}`);
    setMessages(res.data);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    await axios.post(`/messages/${userId}`, { content: text });
    setText("");
    fetchMessages();
  };

  useEffect(() => {
    fetchMessages();
  }, [userId]);

  return (
    <div className="p-4">
      <div className="h-64 overflow-y-auto border p-2 mb-2">
        {messages.map((m) => (
          <p key={m.id} className={m.sender_id === userId ? "text-left" : "text-right"}>
            <span className="px-2 py-1 rounded bg-gray-200">{m.content}</span>
          </p>
        ))}
      </div>
      <form onSubmit={sendMessage} className="flex">
        <input
          className="border flex-1 p-2"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
        />
        <button className="bg-blue-500 text-white px-4">Send</button>
      </form>
    </div>
  );
}
