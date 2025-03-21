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
import ModalWithForm from "../ModalWithForm/ModalWithForm";

import CurrentUserContext from "../../contexts/CurrentUserContext";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

import { register, login, checkToken } from "../../utils/auth";
import {
  getItems,
  addItem,
  deleteItem,
  updateUserProfile,
} from "../../utils/api";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, apiKey } from "../../utils/constants";
import { addCardLike, removeCardLike } from "../../utils/api";

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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.currentUser = currentUser;
    window.isLoggedIn = isLoggedIn;
  }, [currentUser, isLoggedIn]);

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
    setLoading(true);
    getItems()
      .then((items) => {
        setClothingItems(items.reverse());
      })
      .catch((err) => console.error("Failed to fetch items:", err))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleAddItem = async (newItem) => {
    try {
      const savedItem = await addItem(newItem);
      setClothingItems((prevItems) => [savedItem, ...prevItems]);
      setActiveModal("");
    } catch (err) {
      console.error("Error adding item:", err);
    }
  };

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        setWeatherData(filterWeatherData(data));
      })
      .catch((err) => console.error("Unable to fetch weather data:", err));
  }, []);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && activeModal) {
        setActiveModal("");
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [activeModal]);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "C" ? "F" : "C"));
  };

  const handleRegister = ({ email, password, name, avatar }) => {
    register(email, password, name, avatar)
      .then((data) => {
        setCurrentUser(data.user);
        setIsLoggedIn(true);
        localStorage.setItem("jwt", data.token);
        setActiveModal("");
      })
      .catch((err) => {
        console.error("Registration failed:", err);
      });
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const avatar = form.avatar.value;
    const token = localStorage.getItem("jwt");

    updateUserProfile(token, { name, avatar })
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        setActiveModal(null);
      })
      .catch((err) => console.error("Profile update failed:", err));
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

    localStorage.setItem("jwt", credentials.token);
    localStorage.setItem("user", JSON.stringify(credentials.user));

    setCurrentUser(credentials.user);
    setIsLoggedIn(true);
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
              {loading && <div className="loading">Loading...</div>}
              <Routes>
                <Route
                  path="/"
                  element={
                    <Main
                      weatherData={weatherData}
                      clothingItems={clothingItems}
                      handleCardClick={handleCardClick}
                      onCardLike={handleCardLike}
                      currentUser={currentUser}
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
                        currentUser={currentUser}
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
              />
              <LoginModal
                isOpen={activeModal === "login"}
                onClose={() => setActiveModal("")}
                setActiveModal={setActiveModal}
                onAuthSuccess={(credentials) => {
                  handleLogin(credentials);
                }}
              />
              {activeModal === "edit-profile" && (
                <ModalWithForm
                  title="Change Profile Data"
                  isOpen={true}
                  onClose={() => setActiveModal(null)}
                  onSubmit={handleProfileUpdate}
                  className="change-profile__modal"
                >
                  <label>
                    Name*
                    <input
                      className="modal__input"
                      type="text"
                      name="name"
                      defaultValue={currentUser?.name}
                      required
                    />
                  </label>
                  <label>
                    Avatar
                    <input
                      className="modal__input"
                      type="url"
                      name="avatar"
                      defaultValue={currentUser?.avatar}
                    />
                  </label>
                </ModalWithForm>
              )}
            </CurrentTemperatureUnitContext.Provider>
          </CurrentUserContext.Provider>
        </div>
      </div>
    </Router>
  );
}

export default App;
