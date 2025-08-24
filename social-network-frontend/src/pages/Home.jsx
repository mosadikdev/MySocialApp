import { useEffect, useState } from "react";
import api from "../services/api";


export default function Home() {
const [posts, setPosts] = useState([]);


useEffect(() => {
api.get("/posts").then((res) => setPosts(res.data.data));
}, []);


return (
<div className="p-4">
<h2 className="text-2xl font-bold mb-4">Feed</h2>
{posts.map((post) => (
<div key={post.id} className="border rounded-xl p-4 mb-4">
<p className="font-semibold">{post.user.username}</p>
<p>{post.content}</p>
</div>
))}
</div>
);
}