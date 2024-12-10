// import "./AddItemModal.css";
import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ isOpen, onAddItem, onCloseModal }) => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName("");
      setImageUrl("");
      setWeather("");
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, imageUrl, weather });
    onCloseModal();
  };

  return (
    <ModalWithForm
      title="New Garment"
      buttonText="Add Garment"
      isOpen={isOpen}
      onClose={onCloseModal}
      onSubmit={handleSubmit}
      disabled={!name || !imageUrl || !weather}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
      </label>
      <fieldset className="modal__fieldset">
        <legend className="modal__legend">Select the Weather Type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            className="modal__radio"
            name="weatherType"
            id="hot"
            type="radio"
            value="hot"
            checked={weather === "hot"}
            onChange={(e) => setWeather(e.target.value)}
          />
          <span className="modal__label_text">Hot</span>
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            className="modal__radio"
            name="weatherType"
            id="warm"
            type="radio"
            value="warm"
            checked={weather === "warm"}
            onChange={(e) => setWeather(e.target.value)}
          />
          <span className="modal__label_text">Warm</span>
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            className="modal__radio"
            name="weatherType"
            id="cold"
            type="radio"
            value="cold"
            checked={weather === "cold"}
            onChange={(e) => setWeather(e.target.value)}
          />
          <span className="modal__label_text">Cold</span>
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
