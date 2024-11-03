import { useEffect, useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { coordinates, apiKey } from "../../utils/constants";
import {
  getWeather,
  filterWeatherData,
  getWeatherType,
} from "../../utils/weatherApi";

// const [count, setCount] = useState(0);
function App() {
  const [weatherData, setWeatherData] = useState({
    type: { getWeatherType },
    temp: { F: 70 },
    city: "",
    condition: "",
    isDay: true,
  });

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />
        <Footer />
        <ModalWithForm
          title="New Garment"
          buttonText="Add Garment"
          activeModal={activeModal}
          onClose={closeActiveModal}
        >
          <label htmlFor="name" className="modal__label">
            Name{" "}
            <input
              type="text"
              className="modal__input"
              id="name"
              placeholder="Name"
            />
          </label>
          <label htmlFor="imageUrl" className="modal__label">
            Image{" "}
            <input
              type="url"
              className="modal__input"
              id="imageUrl"
              placeholder="Image URL"
            />
          </label>
          <fieldset className="modal__fieldset">
            <legend className="modal__legend">Select the Weather Type:</legend>

            <label htmlFor="hot" className="modal__label_type_radio">
              <input id="hot" type="radio" className="modal__radio-input" />
              <span className="modal__label_text">Hot</span>
            </label>

            <label htmlFor="warm" className="modal__label_type_radio">
              <input id="warm" type="radio" className="modal__radio-input" />
              <span className="modal__label_text">Warm</span>
            </label>

            <label htmlFor="cold" className="modal__label_type_radio">
              <input id="cold" type="radio" className="modal__radio-input" />
              <span className="modal__label_text">Cold</span>
            </label>
          </fieldset>
        </ModalWithForm>
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeActiveModal}
        />
      </div>
    </div>
  );
}

export default App;

// ! // ! REMEMBER! Removed modal__label class from each of the 3 radios. orig: className="modal__label modal__label_type_radio"
