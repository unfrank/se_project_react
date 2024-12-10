import "./App.css";
import Main from "../Main/Main";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import { useEffect, useState } from "react";
import { addClothingItem, deleteClothingItem } from "../../utils/api";
import {
  coordinates,
  apiKey,
  defaultClothingItems,
} from "../../utils/constants";
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

  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  // const handleAddItemSubmit = (item) => {
  //   addClothingItem(item)
  //     .then((newItem) => {
  //       setClothingItems([newItem, ...clothingItems]);
  //     })
  //     .catch((err) => {
  //       console.error("Error adding item:", err);
  //     });
  // };

  const handleAddItemSubmit = (item) => {
    addClothingItem(item)
      .then((newItem) => {
        const completeItem = {
          ...newItem,
          link: newItem.imageUrl || "default-image-url.png",
          weather: newItem.weather || "unknown",
        };
        setClothingItems([completeItem, ...clothingItems]);
      })
      .catch((err) => console.error("Error adding item:", err));
  };

  const openConfirmationModal = (card) => {
    setCardToDelete(card);
    setConfirmationModalOpen(true);
  };

  const handleCardDelete = (card) => {
    deleteClothingItem(card)
      .then((message) => {
        setClothingItems((prevItems) =>
          prevItems.filter((i) => i._id !== card._id)
        );
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

  const handleDeleteItem = (item) => {
    deleteClothingItem(item)
      .then((message) => {
        setClothingItems((prevItems) => {
          const updatedItems = prevItems.filter((i) => i._id !== item._id);
          return updatedItems;
        });
        setActiveModal("");
      })
      .catch((err) => {
        console.error("Error deleting item:", err);
      });
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "C" ? "F" : "C"));
  };

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
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <Profile
                    onAddItem={handleAddClick}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                  />
                }
              />
            </Routes>
            <Footer />
            <AddItemModal
              isOpen={activeModal === "add-garment"}
              onAddItem={handleAddItemSubmit}
              onCloseModal={closeActiveModal}
            />

            <ItemModal
              isOpen={activeModal === "preview"}
              card={selectedCard}
              onClose={() => {
                setActiveModal("");
              }}
              // onDelete={handleDeleteItem}
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
