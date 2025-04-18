import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Marketplace from "./pages/Marketplace";
import ProductDetails from "./pages/ProductCard";
import CartPage from "./pages/CartPage"
import Chatbot from "./pages/Chatbot";
import WeatherPage from "./pages/WeatherInfo";
import AdvisoryPage from "./pages/Advisory";
function App() {
  const [user, setUser] = useState(null);

  // Check if user is stored in session (for persistent login)
  useEffect(() => {
    const loggedInUser = sessionStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Home should always be accessible */}
        <Route path="/" element={<Home user={user} setUser={setUser} />} />

        {/* If user is logged in, don't show login/register */}
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login setUser={setUser} />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />

        {/* Redirect /home explicitly to Home */}
        <Route path="/home" element={<Navigate to="/" />} />

        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/cart" element={<CartPage />} />
        <Route path="/weather" element={<WeatherPage />} />
        <Route path="/advisory" element={<AdvisoryPage />} />



      </Routes>
      <Chatbot />
    </Router>
  );
}

export default App;
