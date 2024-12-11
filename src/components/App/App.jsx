// import "./App.css";
// import Main from "../Main/Main";
// import Header from "../Header/Header";
// import Footer from "../Footer/Footer";
// import Profile from "../Profile/Profile";
// import ItemModal from "../ItemModal/ItemModal";
// import AddItemModal from "../AddItemModal/AddItemModal";
// import { useEffect, useState } from "react";
// import { getItems, addItem, deleteItem } from "../../utils/api";
// import { coordinates, apiKey } from "../../utils/constants";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
// import {
//   getWeather,
//   filterWeatherData,
//   getWeatherType,
// } from "../../utils/weatherApi";
// import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";

// function App() {
//   const [weatherData, setWeatherData] = useState({
//     type: "cold",
//     // !type: { getWeatherType },
//     temp: { F: 70 },
//     city: "",
//     condition: "",
//     isDay: true,
//   });

//   const [clothingItems, setClothingItems] = useState([]); // Initialize with an empty array
//   const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
//   const [cardToDelete, setCardToDelete] = useState(null);
//   const [activeModal, setActiveModal] = useState("");
//   const [selectedCard, setSelectedCard] = useState({});
//   const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

//   useEffect(() => {
//     getItems()
//       .then((fetchedItems) => {
//         console.log("[App] Items fetched from API:", fetchedItems);
//         const formattedItems = fetchedItems.map((item) => ({
//           ...item,
//           imageUrl: item.imageUrl || "default-image-url.png",
//         }));
//         setClothingItems(formattedItems);
//       })
//       .catch((err) => console.error("Error fetching items:", err));
//   }, []);

//   // Fetch weather data on app load
//   useEffect(() => {
//     getWeather(coordinates, apiKey)
//       .then((data) => {
//         const filteredData = filterWeatherData(data);
//         setWeatherData(filteredData);
//       })
//       .catch((err) => {
//         console.error("Error fetching weather data:", err);
//       });
//   }, []);

//   const handleCardClick = (card) => {
//     setActiveModal("preview");
//     setSelectedCard(card);
//   };

//   const handleAddItemSubmit = (item) => {
//     addItem(item)
//       .then((newItem) => {
//         console.log("[App] New item added:", newItem);
//         const completeItem = {
//           ...newItem,
//           link: newItem.imageUrl || "default-image-url.png",
//           weather: newItem.weather || "unknown",
//         };
//         setClothingItems([completeItem, ...clothingItems]);
//       })
//       .catch((err) => console.error("Error adding item:", err));
//   };

//   const handleCardDelete = (card) => {
//     console.log("[App] handleCardDelete called for card:", card);

//     deleteItem(card._id)
//       .then(() => {
//         console.log("[App] Successfully deleted card:", card);

//         setClothingItems((prevItems) => {
//           const updatedItems = prevItems.filter(
//             (item) => item._id !== card._id
//           );
//           return updatedItems;
//         });
//         setConfirmationModalOpen(false);
//         setCardToDelete(null);
//         setActiveModal("");
//       })
//       .catch((err) => {
//         console.error("Error deleting item:", err);
//       });
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

//   const openConfirmationModal = (card) => {
//     console.log("[App] openConfirmationModal called with card:", card);
//     setCardToDelete(card);
//     setConfirmationModalOpen(true);
//   };

//   return (
//     <Router>
//       <div className="page">
//         <div className="page__content">
//           <CurrentTemperatureUnitContext.Provider
//             value={{ currentTemperatureUnit, handleToggleSwitchChange }}
//           >
//             <Header handleAddClick={handleAddClick} weatherData={weatherData} />
//             <Routes>
//               <Route
//                 path="/"
//                 element={
//                   <Main
//                     weatherData={weatherData}
//                     handleCardClick={handleCardClick}
//                     clothingItems={clothingItems}
//                   />
//                 }
//               />
//               <Route
//                 path="/profile"
//                 element={
//                   <Profile
//                     onAddItem={handleAddClick}
//                     handleCardClick={handleCardClick}
//                     clothingItems={clothingItems}
//                   />
//                 }
//               />
//             </Routes>
//             <Footer />
//             <AddItemModal
//               isOpen={activeModal === "add-garment"}
//               onAddItem={handleAddItemSubmit}
//               onCloseModal={closeActiveModal}
//             />
//             <ItemModal
//               isOpen={activeModal === "preview"}
//               card={selectedCard}
//               onClose={() => setActiveModal("")}
//               onDeleteItem={openConfirmationModal}
//             />
//             <DeleteConfirmationModal
//               isOpen={confirmationModalOpen}
//               card={cardToDelete}
//               onClose={() => setConfirmationModalOpen(false)}
//               onConfirm={handleCardDelete}
//             />
//           </CurrentTemperatureUnitContext.Provider>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;

import "./App.css";
import Main from "../Main/Main";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import { useEffect, useState } from "react";
import { getItems, addItem, deleteItem } from "../../utils/api";
import { coordinates, apiKey } from "../../utils/constants";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import {
  getWeather,
  filterWeatherData,
  getWeatherType,
} from "../../utils/weatherApi";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: { getWeatherType },
    temp: { F: 70 },
    city: "",
    condition: "",
    isDay: true,
  });

  const [clothingItems, setClothingItems] = useState([]); // Initialize with an empty array
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  useEffect(() => {
    getItems()
      .then((fetchedItems) => {
        console.log("[App] API response for getItems:", fetchedItems);

        const formattedItems = fetchedItems.reverse().map((item) => ({
          ...item,
          imageUrl: item.imageUrl || "https://via.placeholder.com/150", // Fallback image
          weather: item.weather || "unknown", // Fallback weather type
        }));

        setClothingItems(formattedItems);
        console.log("[App] clothingItems state after API:", formattedItems);
      })
      .catch((err) => console.error("Error fetching items:", err));
  }, []);

  // Fetch weather data on app load
  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch((err) => {
        console.error("Error fetching weather data:", err);
      });
  }, []);

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddItemSubmit = (item) => {
    addItem(item)
      .then((newItem) => {
        console.log("[App] New item added:", newItem);
        const completeItem = {
          ...newItem,
          link: newItem.imageUrl || "default-image-url.png",
          weather: newItem.weather || "unknown",
        };
        setClothingItems([completeItem, ...clothingItems]);
      })
      .catch((err) => console.error("Error adding item:", err));
  };

  const handleCardDelete = (card) => {
    console.log("[App] handleCardDelete called for card:", card);

    deleteItem(card._id)
      .then(() => {
        console.log("[App] Successfully deleted card:", card);

        setClothingItems((prevItems) => {
          const updatedItems = prevItems.filter(
            (item) => item._id !== card._id
          );
          return updatedItems;
        });
        setConfirmationModalOpen(false);
        setCardToDelete(null);
        setActiveModal("");
      })
      .catch((err) => {
        console.error("Error deleting item:", err);
      });
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "C" ? "F" : "C"));
  };

  const openConfirmationModal = (card) => {
    console.log("[App] openConfirmationModal called with card:", card);
    setCardToDelete(card);
    setConfirmationModalOpen(true);
    console.log("[App] confirmationModalOpen state set to:", true);
  };

  return (
    <Router>
      <div className="page">
        <div className="page__content">
          <CurrentTemperatureUnitContext.Provider
            value={{ currentTemperatureUnit, handleToggleSwitchChange }}
          >
            <Header handleAddClick={handleAddClick} weatherData={weatherData} />
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    {console.log(
                      "[App] Passing clothingItems to Main:",
                      clothingItems
                    )}
                    <Main
                      weatherData={weatherData}
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                    />
                  </>
                }
              />
              <Route
                path="/profile"
                element={
                  <>
                    {console.log(
                      "[App] Passing clothingItems to Profile:",
                      clothingItems
                    )}
                    <Profile
                      onAddItem={handleAddClick}
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                    />
                  </>
                }
              />
            </Routes>
            <Footer />
            <AddItemModal
              isOpen={activeModal === "add-garment"}
              onAddItem={(item) => {
                console.log("[App] AddItemModal onAddItem called with:", item);
                handleAddItemSubmit(item);
              }}
              onCloseModal={() => {
                console.log("[App] AddItemModal onCloseModal called");
                closeActiveModal();
              }}
            />
            <ItemModal
              isOpen={activeModal === "preview"}
              card={selectedCard}
              onClose={() => setActiveModal("")}
              onDeleteItem={openConfirmationModal}
            />
            <DeleteConfirmationModal
              isOpen={confirmationModalOpen}
              card={cardToDelete}
              onClose={() => setConfirmationModalOpen(false)}
              onConfirm={handleCardDelete}
            />
          </CurrentTemperatureUnitContext.Provider>
        </div>
      </div>
    </Router>
  );
}

export default App;
