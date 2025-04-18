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
import ProfileModal from "../ProfileModal/ProfileModal";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

import { register, login, getUserInfo } from "../../utils/auth";

import {
  getItems,
  addItem,
  deleteItem,
  updateUserProfile,
} from "../../utils/api";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, apiKey } from "../../utils/constants";
import { addCardLike, removeCardLike, getUserInfo } from "../../utils/api";
// import { getUserInfo } from "../utils/api";

function App() {
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      setIsLoggedIn(false);
      setCurrentUser(null);
      return;
    }

    checkToken(token)
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch((err) => console.error("Token check failed:", err));
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getItems()
      .then((items) => {
        setClothingItems(items.reverse());
      })
      .catch((err) => console.error("Failed to fetch items:", err))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleAddItem = async (newItem) => {
    setIsLoading(true);
    try {
      const savedItem = await addItem(newItem);
      setClothingItems((prevItems) => [savedItem, ...prevItems]);
      setActiveModal("");
    } catch (err) {
      console.error("Error adding item:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        setWeatherData(filterWeatherData(data));
      })
      .catch((err) => console.error("Unable to fetch weather data:", err));
  }, []);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "C" ? "F" : "C"));
  };

  //! orig
  // const handleRegister = ({ email, password, name, avatar }) => {
  //   setIsLoading(true);
  //   register(email, password, name, avatar)
  //     .then(() => {
  //       return login({ email, password });
  //     })
  //     .then((res) => {
  //       localStorage.setItem("jwt", res.token);
  //       setCurrentUser(res.user);
  //       setIsLoggedIn(true);
  //       setActiveModal("");
  //     })
  //     .catch((err) => {
  //       console.error("Registration/login failed:", err);
  //     })
  //     .finally(() => setIsLoading(false));
  // };

  const handleRegister = ({ email, password, name, avatar }) => {
    setIsLoading(true);
    register(email, password, name, avatar)
      .then(() => {
        return login({ email, password });
      })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        return getUserInfo(res.token);
      })
      .then((user) => {
        setCurrentUser(user);
        return getUserInfo(res.token); // ← fetch user immediately
      })
      .then((userData) => {
        setCurrentUser(userData); // ← update state
        setIsLoggedIn(true);
        setActiveModal("");
      })
      .catch((err) => {
        console.error("Registration/login failed:", err);
      })
      .finally(() => setIsLoading(false));
  };

  //!

  const handleProfileUpdate = ({ name, avatar }) => {
    setIsLoading(true);
    const token = localStorage.getItem("jwt");

    updateUserProfile(token, { name, avatar })
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        setActiveModal(null);
      })
      .catch((err) => console.error("Profile update failed:", err))
      .finally(() => setIsLoading(false));
  };

  const handleDeleteItem = async (card) => {
    try {
      await deleteItem(card._id);
      setClothingItems((prevItems) =>
        prevItems.filter((item) => item._id !== card._id)
      );
      setActiveModal("");
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  const handleLogin = async (credentials) => {
    if (!credentials.user || !credentials.token) {
      return;
    }
    setIsLoading(true);
    localStorage.setItem("jwt", credentials.token);
    localStorage.setItem("user", JSON.stringify(credentials.user));

    setCurrentUser(credentials.user);
    setIsLoggedIn(true);
    setIsLoading(false);
  };

  const handleCardClick = (item) => {
    setSelectedCard(item);
    setActiveModal("preview");
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  const handleCardLike = (item) => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    const isLiked = item.likes.some((id) => id === currentUser._id);
    const apiCall = isLiked ? removeCardLike : addCardLike;

    apiCall(item._id, token)
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((clothingItem) =>
            clothingItem._id === item._id ? updatedCard : clothingItem
          )
        );
      })
      .catch((err) => console.error("Error updating likes:", err));
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
                onAddItem={() => setActiveModal("add-garment")}
              />
              {isLoading && <div className="loading">Loading...</div>}
              <Routes>
                <Route
                  path="/"
                  element={
                    <Main
                      weatherData={weatherData}
                      clothingItems={clothingItems}
                      handleCardClick={handleCardClick}
                      onCardLike={handleCardLike}
                    />
                  }
                />
                <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
                  <Route
                    path="/profile"
                    element={
                      <Profile
                        clothingItems={clothingItems}
                        onAddItem={() => setActiveModal("add-garment")}
                        setActiveModal={setActiveModal}
                        handleCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                      />
                    }
                  />
                </Route>
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>

              <Footer />
              <AddItemModal
                isOpen={activeModal === "add-garment"}
                onAddItem={handleAddItem}
                onCloseModal={() => setActiveModal("")}
                isLoading={isLoading}
                buttonText={isLoading ? "Saving..." : "Add Garment"}
              />
              <ItemModal
                isOpen={activeModal === "preview"}
                card={selectedCard}
                onClose={() => setActiveModal("")}
                onDeleteItem={handleDeleteItem}
              />
              <DeleteConfirmationModal
                isOpen={activeModal === "delete-confirmation"}
                onClose={() => setActiveModal("")}
              />
              <RegisterModal
                isOpen={activeModal === "register"}
                onClose={() => setActiveModal("")}
                onRegister={handleRegister}
                isLoading={isLoading}
                buttonText={isLoading ? "Saving..." : "Sign Up"}
                setActiveModal={setActiveModal}
              />
              <LoginModal
                isOpen={activeModal === "login"}
                onClose={() => setActiveModal("")}
                setActiveModal={setActiveModal}
                onAuthSuccess={(credentials) => {
                  handleLogin(credentials);
                }}
                isLoading={isLoading}
                buttonText={isLoading ? "Saving..." : "Log In"}
              />
              <ProfileModal
                isOpen={activeModal === "edit-profile"}
                onClose={() => setActiveModal(null)}
                onSubmit={handleProfileUpdate}
                currentUser={currentUser}
              />
            </CurrentTemperatureUnitContext.Provider>
          </CurrentUserContext.Provider>
        </div>
      </div>
    </Router>
  );
}

export default App;
