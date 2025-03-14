import "./App.css";
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Main from "../Main/Main";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";

import RegisterModal from "../Authorization/RegisterModal/RegisterModal";
import LoginModal from "../Authorization/LoginModal/LoginModal";
import ProtectedRoute from "../Authorization/ProtectedRoute/ProtectedRoute";

import CurrentUserContext from "../../contexts/CurrentUserContext";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

import { register, login, checkToken } from "../../utils/auth";
import { getItems, addItem } from "../../utils/api";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, apiKey } from "../../utils/constants";

function App() {
  console.log("🔥 App component rendered");

  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [weatherData, setWeatherData] = useState({
    temp: { F: 70 },
    city: "",
    condition: "",
    isDay: true,
  });
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [loading, setLoading] = useState(false);

  console.log("🔍 State on render:", {
    currentUser,
    isLoggedIn,
    clothingItems,
    activeModal,
    weatherData,
  });

  useEffect(() => {
    window.currentUser = currentUser;
    window.isLoggedIn = isLoggedIn;
    console.log("🟢 App State Updated →", { currentUser, isLoggedIn });
  }, [currentUser, isLoggedIn]);

  useEffect(() => {
    console.log("🔄 Checking authentication state...");
    const token = localStorage.getItem("jwt");

    if (!token) {
      console.log("🚨 No token found. User is NOT logged in.");
      setIsLoggedIn(false);
      setCurrentUser(null);
      return;
    }

    checkToken(token)
      .then((user) => {
        console.log("✅ User authenticated:", user);
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch(() => {
        console.log("❌ Invalid token. Logging out.");
        localStorage.removeItem("jwt"); // This should clear an invalid token
        setIsLoggedIn(false);
        setCurrentUser(null);
      });
  }, []);

  // 🔄 Load Clothing Items
  useEffect(() => {
    console.log("🔄 Fetching clothing items...");
    setLoading(true);
    getItems()
      .then((items) => {
        console.log("✅ Clothing items fetched:", items);
        setClothingItems(items.reverse());
      })
      .catch(() => console.error("❌ Failed to fetch items."))
      .finally(() => {
        console.log("✅ Finished loading clothing items.");
        setLoading(false);
      });
  }, []);

  const handleAddItem = async (newItem) => {
    console.log("🟡 Attempting to add item:", newItem);
    try {
      const savedItem = await addItem(newItem); // Wait for API response
      console.log("✅ Successfully added item:", savedItem);

      setClothingItems((prevItems) => {
        const updatedItems = [savedItem, ...prevItems];
        console.log("🔄 Updated clothingItems state:", updatedItems);
        return updatedItems;
      });

      setActiveModal(""); // Close modal after state updates
    } catch (err) {
      console.error("❌ Error adding item:", err);
    }
  };

  // 🔄 Load Weather Data
  useEffect(() => {
    console.log("🌦 Fetching weather data...");
    getWeather(coordinates, apiKey)
      .then((data) => {
        console.log("✅ Weather data received:", data);
        setWeatherData(filterWeatherData(data));
      })
      .catch(() => console.error("❌ Unable to fetch weather data."));
  }, []);

  // ✅ Handle Temperature Unit Toggle
  const handleToggleSwitchChange = () => {
    console.log("🔄 Toggling temperature unit...");
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "C" ? "F" : "C"));
  };

  // ✅ Handle User Registration
  const handleRegister = (userData) => {
    console.log("🔄 Registering user:", userData);
    return register(userData)
      .then((res) => {
        console.log("✅ Registration response:", res);

        if (!res.user || !res.token) {
          console.error("❌ Error: No user or token in response!");
          return;
        }

        localStorage.setItem("jwt", res.token);
        setCurrentUser({ ...res.user }); // Force UI update
        setIsLoggedIn(true);
        setActiveModal("");
      })
      .catch((err) => {
        console.error("❌ Registration failed:", err);
        throw err;
      });
  };

  // ✅ Handle User Login (Forces Immediate UI Update)
  const handleLogin = async (credentials) => {
    console.log("🟢 LoginModal passed credentials:", credentials);

    if (!credentials.user || !credentials.token) {
      console.log("❌ Invalid credentials received:", credentials);
      return;
    }

    localStorage.setItem("jwt", credentials.token);
    localStorage.setItem("user", JSON.stringify(credentials.user));

    setCurrentUser(credentials.user);
    setIsLoggedIn(true);

    // ❌ No setActiveModal(""); here, modal remains open
  };

  const handleLogout = () => {
    console.log("🔄 Logging out...");

    // ✅ Remove token from localStorage
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");

    // ✅ Reset state
    setCurrentUser(null);
    setIsLoggedIn(false);

    console.log("✅ Logout successful.");
  };

  return (
    <Router>
      <div className="page">
        <div className="page__content">
          <CurrentUserContext.Provider value={{ currentUser, isLoggedIn }}>
            <CurrentTemperatureUnitContext.Provider
              value={{ currentTemperatureUnit, handleToggleSwitchChange }}
            >
              <Header
                weatherData={weatherData}
                onLogout={handleLogout}
                onLogin={() => setActiveModal("login")}
                onSignUp={() => setActiveModal("register")}
                onAddItem={() => setActiveModal("add-garment")} // <-- Pass function to open AddItemModal
              />

              {loading && <div className="loading">Loading...</div>}
              <Routes>
                <Route
                  path="/"
                  element={
                    <Main
                      weatherData={weatherData}
                      clothingItems={clothingItems}
                    />
                  }
                />
                <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
                  <Route
                    path="/profile"
                    element={<Profile clothingItems={clothingItems} />}
                  />
                </Route>
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
              <Footer />

              <AddItemModal
                isOpen={activeModal === "add-garment"}
                onAddItem={handleAddItem}
                onCloseModal={() => setActiveModal("")}
              />
              <ItemModal
                isOpen={activeModal === "preview"}
                card={selectedCard}
                onClose={() => setActiveModal("")}
              />
              <DeleteConfirmationModal
                isOpen={activeModal === "delete-confirmation"}
                onClose={() => setActiveModal("")}
              />
              <RegisterModal
                isOpen={activeModal === "register"}
                onClose={() => setActiveModal("")}
                onRegister={handleRegister}
              />

              <LoginModal
                isOpen={activeModal === "login"}
                onClose={() => setActiveModal("")}
                onAuthSuccess={(credentials) => {
                  console.log("🟢 LoginModal passed credentials:", credentials);
                  handleLogin(credentials);
                }}
              />
            </CurrentTemperatureUnitContext.Provider>
          </CurrentUserContext.Provider>
        </div>
      </div>
    </Router>
  );
}

export default App;
