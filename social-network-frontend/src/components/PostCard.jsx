import { useState, useEffect } from "react";
import axios from "../axios";

export default function PostCard({ post }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [likesCount, setLikesCount] = useState(post.likes_count || 0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    fetchComments();
    checkIfLiked();
  }, []);

  const fetchComments = async () => {
    const res = await axios.get(`/posts/${post.id}/comments`);
    setComments(res.data);
  };

  const addComment = async (e) => {
    e.preventDefault();
    if (!newComment) return;
    const res = await axios.post(`/posts/${post.id}/comments`, { body: newComment });
    setComments([...comments, res.data]);
    setNewComment("");
  };

  const checkIfLiked = async () => {
    const res = await axios.get(`/posts/${post.id}/likes`);
    setLiked(res.data.liked);
    setLikesCount(res.data.count);
  };

  const toggleLike = async () => {
    if (liked) {
      await axios.delete(`/posts/${post.id}/likes`);
      setLikesCount(likesCount - 1);
    } else {
      await axios.post(`/posts/${post.id}/likes`);
      setLikesCount(likesCount + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className="border rounded-xl p-4 mb-4 bg-white shadow">
      <h2 className="font-bold">{post.user.username}</h2>
      <p className="mb-2">{post.content}</p>

      <button
        onClick={toggleLike}
        className={`px-2 py-1 rounded ${liked ? "bg-red-500 text-white" : "bg-gray-200"}`}
      >
        ❤️ {likesCount}
      </button>

      <div className="mt-4">
        <h3 className="font-semibold">Comments</h3>
        {comments.map((c) => (
          <p key={c.id} className="text-sm border-b py-1">
            <span className="font-bold">{c.user.username}:</span> {c.body}
          </p>
        ))}

        <form onSubmit={addComment} className="mt-2 flex gap-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add comment..."
            className="flex-1 border rounded p-1"
          />
          <button type="submit" className="bg-blue-500 text-white px-3 rounded">إرسال</button>
        </form>
      </div>
    </div>
  );
}
