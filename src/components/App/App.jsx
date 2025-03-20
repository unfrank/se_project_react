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
        localStorage.removeItem("jwt");
        setCurrentUser(null);
      });
  }, []);

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
      const savedItem = await addItem(newItem); // ✅ Ensure addItem() is async
      console.log("✅ Successfully added item:", savedItem);

      setClothingItems((prevItems) => [savedItem, ...prevItems]);

      setActiveModal(""); // ✅ Close modal
    } catch (err) {
      console.error("❌ Error adding item:", err);
    }
  };

  useEffect(() => {
    console.log("🌦 Fetching weather data...");
    getWeather(coordinates, apiKey)
      .then((data) => {
        console.log("✅ Weather data received:", data);
        setWeatherData(filterWeatherData(data));
      })
      .catch(() => console.error("❌ Unable to fetch weather data."));
  }, []);

  const handleToggleSwitchChange = () => {
    console.log("🔄 Toggling temperature unit...");
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "C" ? "F" : "C"));
  };

  const handleRegister = ({ email, password, name, avatar }) => {
    register(email, password, name, avatar)
      .then((data) => {
        console.log("✅ Registration successful:", data);
        setCurrentUser(data.user);
        setIsLoggedIn(true);
        localStorage.setItem("jwt", data.token);
        setActiveModal("");
      })
      .catch((err) => {
        console.error("❌ Registration failed:", err);
      });
  };
  const handleProfileUpdate = (e) => {
    e.preventDefault();
    console.log("🟢 handleProfileUpdate fired!");
    const form = e.target;
    const name = form.name.value;
    const avatar = form.avatar.value;
    const token = localStorage.getItem("jwt");

    updateUserProfile(token, { name, avatar })
      .then((updatedUser) => {
        console.log("✅ Profile updated successfully:", updatedUser);
        setCurrentUser(updatedUser);
        setActiveModal(null);
      })
      .catch((err) => console.error("Profile update failed:", err));
  };

  const handleDeleteItem = async (card) => {
    console.log("🟡 Deleting item:", card);

    try {
      await deleteItem(card._id);
      console.log("✅ Successfully deleted item from API:", card._id);

      setClothingItems((prevItems) =>
        prevItems.filter((item) => item._id !== card._id)
      );

      setActiveModal("");
    } catch (err) {
      console.error("❌ Error deleting item:", err);
    }
  };

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
  };

  const handleCardClick = (item) => {
    console.log("🟡 handleCardClick called with:", item);
    setSelectedCard(item);
    setActiveModal("preview");
  };

  const handleLogout = () => {
    console.log("🔄 Logging out...");

    localStorage.removeItem("jwt");
    localStorage.removeItem("user");

    setCurrentUser(null);
    setIsLoggedIn(false);

    console.log("✅ Logout successful.");
  };

  const handleCardLike = (item) => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      console.error("❌ No token found. User is not logged in.");
      return;
    }

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
      .catch((err) => console.error("❌ Error updating likes:", err));
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
                onAddItem={() => {
                  console.log("✅ `onAddItem` called from Header!");
                  setActiveModal("add-garment");
                }}
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
