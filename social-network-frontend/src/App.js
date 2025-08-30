import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";


function App() {
return (
<Router>
<Navbar />
<Routes>
<Route path="/" element={<Home />} />
<Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
<Route path="/" element={<PrivateRoute><Home /></PrivateRoute>}/>
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
</Routes>
</Router>
);
}


export default App;