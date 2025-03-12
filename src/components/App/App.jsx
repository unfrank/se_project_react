// import "./App.css";

// import Main from "../Main/Main";
// import Header from "../Header/Header";
// import Footer from "../Footer/Footer";
// import Profile from "../Profile/Profile";
// import ItemModal from "../ItemModal/ItemModal";
// import AddItemModal from "../AddItemModal/AddItemModal";
// import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";

// // !
// import RegisterModal from "../Authorization/RegisterModal/RegisterModal";

// import LoginModal from "../Authorization/LoginModal/LoginModal";

// import ProtectedRoute from "../Authorization/ProtectedRoute/ProtectedRoute";

// import CurrentUserContext from "../../contexts/CurrentUserContext";
// // !

// import { useEffect, useState } from "react";
// import { getItems, addItem, deleteItem } from "../../utils/api";
// import { checkToken } from "../../utils/auth";
// import { coordinates, apiKey } from "../../utils/constants";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
// import {
//   getWeather,
//   filterWeatherData,
//   getWeatherType,
// } from "../../utils/weatherApi";

// function App() {
//   const [weatherData, setWeatherData] = useState({
//     type: { getWeatherType },
//     temp: { F: 70 },
//     city: "",
//     condition: "",
//     isDay: true,
//   });

//   const [clothingItems, setClothingItems] = useState([]);
//   const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
//   const [cardToDelete, setCardToDelete] = useState(null);
//   const [activeModal, setActiveModal] = useState("");
//   const [selectedCard, setSelectedCard] = useState({});
//   const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
//   const [loading, setLoading] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     setLoading(true);
//     getItems()
//       .then((fetchedItems) => {
//         const formattedItems = fetchedItems.reverse().map((item) => ({
//           ...item,
//           imageUrl: item.imageUrl,
//           weather: item.weather,
//         }));
//         setClothingItems(formattedItems);
//       })
//       .catch((err) => {
//         console.error("Error fetching items:", err);
//         alert("Failed to fetch items.");
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, []);

//   useEffect(() => {
//     setLoading(true);
//     getWeather(coordinates, apiKey)
//       .then((data) => {
//         const filteredData = filterWeatherData(data);
//         setWeatherData(filteredData);
//       })
//       .catch((err) => {
//         console.error("Error fetching weather data:", err);
//         alert("Unable to fetch weather data.");
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, []);

//   useEffect(() => {
//     const token = localStorage.getItem("jwt");

//     if (!token) {
//       console.log("🚨 No token found. Setting isLoggedIn to false.");
//       setIsLoggedIn(false);
//       setCurrentUser(null);
//       return;
//     }

//     checkToken(token)
//       .then((user) => {
//         console.log("✅ User authenticated:", user);
//         setCurrentUser(user);
//         setIsLoggedIn(true);
//       })
//       .catch((err) => {
//         console.error("❌ Token validation failed:", err);
//         localStorage.removeItem("jwt");
//         setIsLoggedIn(false);
//         setCurrentUser(null);
//       });
//   }, []);

//   const handleCardClick = (card) => {
//     setActiveModal("preview");
//     setSelectedCard(card);
//   };

//   const handleAddItemSubmit = (item) => {
//     return addItem(item).then((newItem) => {
//       const completeItem = {
//         ...newItem,
//         link: newItem.imageUrl,
//         weather: newItem.weather,
//       };
//       setClothingItems([completeItem, ...clothingItems]);
//     });
//   };

//   const handleAddClick = () => {
//     setActiveModal("add-garment");
//   };

//   const closeActiveModal = () => {
//     setActiveModal("");
//   };

//   const handleToggleSwitchChange = () => {
//     setCurrentTemperatureUnit((prevUnit) => (prevUnit === "C" ? "F" : "C"));
//   };

//   // const handleLogout = () => {
//   //   localStorage.removeItem("jwt");
//   //   setCurrentUser(null);
//   //   setIsLoggedIn(false);
//   // };
//   const handleLogout = () => {
//     console.log("🚪 Logging out...");

//     localStorage.removeItem("jwt");
//     setCurrentUser(null);
//     setIsLoggedIn(false);

//     // 🔥 Force re-render by refreshing
//     window.location.href = "/";
//   };

//   return (
//     <Router>
//       <div className="page">
//         <div className="page__content">
//           {/* <CurrentUserContext.Provider value={currentUser}> */}
//           <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
//             <CurrentTemperatureUnitContext.Provider
//               value={{ currentTemperatureUnit, handleToggleSwitchChange }}
//             >
//               <Header
//                 handleAddClick={handleAddClick}
//                 weatherData={weatherData}
//                 onLogout={handleLogout}
//                 onLogin={() => setActiveModal("login")}
//                 onSignUp={() => setActiveModal("register")}
//               />
//               {loading && <div className="loading">Loading...</div>}{" "}
//               {/* <Routes>
//                 <Route
//                   path="/"
//                   element={
//                     <Main
//                       weatherData={weatherData}
//                       handleCardClick={handleCardClick}
//                       clothingItems={clothingItems}
//                     />
//                   }
//                 />
//                 <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
//                   <Route
//                     path="/profile"
//                     element={<Profile clothingItems={clothingItems} />}
//                   />
//                 </Route>
//               </Routes> */}
//               <Routes>
//                 <Route
//                   path="/"
//                   element={
//                     <Main
//                       weatherData={weatherData}
//                       handleCardClick={handleCardClick}
//                       clothingItems={clothingItems}
//                     />
//                   }
//                 />
//                 <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
//                   <Route
//                     path="/profile"
//                     element={<Profile clothingItems={clothingItems} />}
//                   />
//                 </Route>
//                 <Route path="*" element={<Navigate to="/" />} />
//               </Routes>
//               <Footer />
//               <AddItemModal
//                 isOpen={activeModal === "add-garment"}
//                 onAddItem={handleAddItemSubmit}
//                 onCloseModal={closeActiveModal}
//               />
//               <ItemModal
//                 isOpen={activeModal === "preview"}
//                 card={selectedCard}
//                 onClose={closeActiveModal}
//               />
//               <DeleteConfirmationModal
//                 isOpen={confirmationModalOpen}
//                 card={cardToDelete}
//                 onClose={closeActiveModal}
//               />
//               <RegisterModal
//                 isOpen={activeModal === "register"}
//                 onClose={closeActiveModal}
//               />
//               <LoginModal
//                 isOpen={activeModal === "login"}
//                 onClose={closeActiveModal}
//               />
//             </CurrentTemperatureUnitContext.Provider>
//           </CurrentUserContext.Provider>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;

// !! remake

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

import { register } from "../../utils/auth";
import { checkToken } from "../../utils/auth";
import { getItems, addItem } from "../../utils/api";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, apiKey } from "../../utils/constants";

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

  // Ensure buttons show correctly by setting `isLoggedIn` properly
  useEffect(() => {
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
        setIsLoggedIn(false);
        setCurrentUser(null);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    getItems()
      .then((items) => setClothingItems(items.reverse()))
      .catch(() => alert("Failed to fetch items."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => setWeatherData(filterWeatherData(data)))
      .catch(() => alert("Unable to fetch weather data."));
  }, []);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "C" ? "F" : "C"));
  };

  const handleRegister = (userData) => {
    return register(userData) // Calls API function
      .then((res) => {
        console.log("✅ Registration successful:", res);
        localStorage.setItem("jwt", res.token); // Store token
        setCurrentUser(res.user);
        setIsLoggedIn(true);
        setActiveModal(""); // Close modal
      })
      .catch((err) => {
        console.error("❌ Registration failed:", err);
        throw err;
      });
  };

  const handleLogin = (credentials) => {
    login(credentials)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        return checkToken(res.token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        setActiveModal("");
      })
      .catch((err) => {
        console.error("Login Error:", err);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  const closeActiveModal = () => {
    setActiveModal(""); // This will close any active modal
  };

  return (
    <Router>
      <div className="page">
        <div className="page__content">
          <CurrentUserContext.Provider
            value={{ currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn }}
          >
            <CurrentTemperatureUnitContext.Provider
              value={{ currentTemperatureUnit, handleToggleSwitchChange }}
            >
              <Header
                weatherData={weatherData}
                onLogout={handleLogout}
                onLogin={() => setActiveModal("login")}
                onSignUp={() => setActiveModal("register")}
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
                onAddItem={addItem}
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
                onClose={closeActiveModal}
                onRegister={handleRegister}
              />

              <LoginModal
                isOpen={activeModal === "login"}
                onClose={() => setActiveModal("")}
              />
            </CurrentTemperatureUnitContext.Provider>
          </CurrentUserContext.Provider>
        </div>
      </div>
    </Router>
  );
}

export default App;
