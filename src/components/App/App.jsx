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

  useEffect(() => {
    getItems()
      .then((fetchedItems) => {
        const formattedItems = fetchedItems.reverse().map((item) => ({
          ...item,
          imageUrl: item.imageUrl,
          weather: item.weather,
        }));

        setClothingItems(formattedItems);
      })
      .catch((err) => console.error("Error fetching items:", err));
  }, []);

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
        const completeItem = {
          ...newItem,
          link: newItem.imageUrl,
          weather: newItem.weather,
        };
        setClothingItems([completeItem, ...clothingItems]);
      })
      .catch((err) => console.error("Error adding item:", err));
  };

  const handleCardDelete = (card) => {
    deleteItem(card._id)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== card._id)
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

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "C" ? "F" : "C"));
  };

  const openConfirmationModal = (card) => {
    setCardToDelete(card);
    setConfirmationModalOpen(true);
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
