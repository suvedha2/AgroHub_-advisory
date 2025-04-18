import React, { useEffect, useState } from "react";
import "./WeatherPage.css";
import Navbar from "../pages/Navbar";
import Footer from "../pages/Footer";

const WeatherPage = ({ users, onLogout }) => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [userName, setUserName] = useState("Guest");
  const apiKey = "4acf3df82a7d42d70e877564b738a335"; // Replace with your OpenWeatherMap API key
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("agrohub-user"));
    if (storedUser && storedUser.name) {
      setUserName(storedUser.name);
    }
    getCurrentLocationWeather();
  }, []);

  const getCurrentLocationWeather = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
          );
          if (!res.ok) throw new Error("Failed to fetch current location weather");
          const data = await res.json();
          setWeather(data);
          setCity(data.name);
        } catch (err) {
          setError("Location access denied or error fetching weather");
        }
      },
      () => {
        setError("Please allow location access to get current weather");
      }
    );
  };

  const fetchWeatherByCity = async () => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`
      );
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();
      setWeather(data);
      setCity(query);
      setQuery("");
      setError("");
    } catch (err) {
      setError("City not found or API error");
    }
  };

  const getFarmingTips = () => {
    if (!weather) return null;
    const { humidity, temp } = weather.main;
    const condition = weather.weather[0].main;

    if (condition.includes("Rain")) return "🌧️ Delay pesticide spraying and protect stored grains.";
    if (temp > 35) return "🔥 Ensure crops are well irrigated. Avoid afternoon work.";
    if (humidity < 40) return "💧 Ideal time for irrigation. Monitor soil moisture.";
    return "🌿 Weather is suitable for regular farming activities.";
  };

  const getBuyerTips = () => {
    if (!weather) return null;
    const condition = weather.weather[0].main;
    const temp = weather.main.temp;

    if (condition.includes("Rain")) return "🚚 Deliveries may be delayed due to rain. Please plan accordingly.";
    if (temp > 35) return "🧊 Increased demand expected for cold storage and dairy products.";
    return "✅ Good weather for timely deliveries and fresh produce.";
  };

  const getCropSuggestions = () => {
    if (!weather) return [];
    const temp = weather.main.temp;
    if (temp >= 25 && temp <= 35) return ["Maize", "Soybean", "Cotton"];
    if (temp < 20) return ["Wheat", "Barley", "Peas"];
    return ["Millets", "Groundnut", "Mustard"];
  };

  return (
    <>
      <Navbar user={user} />
      <h3 className="session-greeting"><center>Hi, {user ? user.name : "Guest"}! 👋Know the Sky, Grow the Supply!</center></h3>
      <div className="weather-container">
        <h2>🌦️ Weather Advisory</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search city..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={fetchWeatherByCity}>Search</button>
        </div>

        {error && <p className="error-msg">{error}</p>}

        {weather && (
          <div className="weather-card">
            <h3>📍 {city}</h3>
            <p>🌡️ Temperature: {weather.main.temp}°C</p>
            <p>💧 Humidity: {weather.main.humidity}%</p>
            <p>💨 Wind: {weather.wind.speed} m/s</p>
            <p>☁️ Condition: {weather.weather[0].description}</p>

            <div className="info-box">
              <h4>👨‍🌾 Farming Tips</h4>
              <p>{getFarmingTips()}</p>
            </div>

            <div className="info-box">
              <h4>🛒 Buyer Advisory</h4>
              <p>{getBuyerTips()}</p>
            </div>

            <div className="info-box">
              <h4>🌱 Suggested Crops</h4>
              <ul>
                {getCropSuggestions().map((crop, idx) => (
                  <li key={idx}>{crop}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default WeatherPage;
