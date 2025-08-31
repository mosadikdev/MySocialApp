import { useState } from "react";
import axios from "../utils/axios";

export default function SearchBar({ type = "users" }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!query) return;
    const res = await axios.get(`/search/${type}?q=${query}`);
    setResults(res.data);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={`Search ${type}`}
        className="border p-2 rounded w-64 mr-2"
      />
      <button onClick={handleSearch} className="bg-blue-500 text-white px-3 py-1 rounded">Search</button>
      <div className="mt-2">
        {results.map(r => (
          <div key={r.id} className="border p-2 mb-1 rounded">{type === 'users' ? r.username : r.content}</div>
        ))}
      </div>
    </div>
  );
}
