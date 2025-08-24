import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";


function App() {
return (
<Router>
<nav className="p-4 bg-gray-100 flex gap-4">
<Link to="/">Home</Link>
<Link to="/profile">Profile</Link>
<Link to="/login">Login</Link>
<Link to="/register">Register</Link>
</nav>
<Routes>
<Route path="/" element={<Home />} />
<Route path="/profile" element={<Profile />} />
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
</Routes>
</Router>
);
}


export default App;