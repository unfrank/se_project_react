import "./App.css";

import Main from "../Main/Main";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";

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

function App() {
  const [weatherData, setWeatherData] = useState({
    type: { getWeatherType },
    temp: { F: 70 },
    city: "",
    condition: "",
    isDay: true,
  });

  const [clothingItems, setClothingItems] = useState([]);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getItems()
      .then((fetchedItems) => {
        const formattedItems = fetchedItems.reverse().map((item) => ({
          ...item,
          imageUrl: item.imageUrl,
          weather: item.weather,
        }));
        setClothingItems(formattedItems);
      })
      .catch((err) => {
        console.error("Error fetching items:", err);
        alert("Failed to fetch items. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch((err) => {
        console.error("Error fetching weather data:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddItemSubmit = (item) => {
    return addItem(item)
      .then((newItem) => {
        const completeItem = {
          ...newItem,
          link: newItem.imageUrl,
          weather: newItem.weather,
        };
        setClothingItems([completeItem, ...clothingItems]);
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Error adding item:", err);
      });
  };

  const handleCardDelete = (card) => {
    return deleteItem(card._id)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== card._id)
        );
        setConfirmationModalOpen(false);
        setCardToDelete(null);
        closeActiveModal();
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

  // ?
  const openConfirmationModal = (card) => {
    setCardToDelete(card);
    setConfirmationModalOpen(true);
    return Promise.resolve();
  };

  // ?
  const closeConfirmationModal = () => {
    setCardToDelete(null);
    setConfirmationModalOpen(false);
  };

  return (
    <Router>
      <div className="page">
        <div className="page__content">
          <CurrentTemperatureUnitContext.Provider
            value={{ currentTemperatureUnit, handleToggleSwitchChange }}
          >
            <Header handleAddClick={handleAddClick} weatherData={weatherData} />
            {loading && <div className="loading">Loading...</div>}{" "}
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
              onClose={closeActiveModal}
              onDeleteItem={openConfirmationModal}
            />
            <DeleteConfirmationModal
              isOpen={confirmationModalOpen}
              card={cardToDelete}
              onClose={closeConfirmationModal}
              onConfirm={handleCardDelete}
            />
          </CurrentTemperatureUnitContext.Provider>
        </div>
      </div>
    </Router>
  );
}

export default App;
