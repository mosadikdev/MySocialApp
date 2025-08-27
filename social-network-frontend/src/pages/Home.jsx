import React, { useEffect, useState, useContext } from "react";
import axios from "../utils/axios";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");

  const fetchPosts = async () => {
    const res = await axios.get("/posts");
    setPosts(res.data);
  };

  const addPost = async (e) => {
    e.preventDefault();
    await axios.post("/posts", { content });
    setContent("");
    fetchPosts();
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="p-6">
      {user && (
        <form onSubmit={addPost} className="mb-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          >
            Post
          </button>
        </form>
      )}

      <div>
        {posts.map((post) => (
          <div key={post.id} className="border p-3 mb-2 rounded">
            <p className="font-bold">{post.user.username}</p>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
