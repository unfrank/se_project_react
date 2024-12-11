import "./AddItemModal.css";
import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ isOpen, onAddItem, onCloseModal }) => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setName("");
      setImageUrl("");
      setWeather("");
      setErrors({});
      setIsFormValid(false);
    }
  }, [isOpen]);

  const validateField = (field, value) => {
    let errorMessage = "";

    if (field === "name") {
      if (!value.trim()) errorMessage = "Name is required.";
      else if (value.length < 2)
        errorMessage = "Name must be at least 2 characters.";
    }

    if (field === "imageUrl") {
      if (!value.trim()) errorMessage = "Image URL is required.";
      else {
        try {
          new URL(value);
        } catch {
          errorMessage = "Enter a valid URL.";
        }
      }
    }

    setErrors((prev) => ({ ...prev, [field]: errorMessage }));
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    validateField("name", value);
  };

  const handleImageUrlChange = (e) => {
    const value = e.target.value;
    setImageUrl(value);
    validateField("imageUrl", value);
  };

  const handleWeatherChange = (e) => {
    const value = e.target.value;
    setWeather(value);
    validateField("weather", value);
  };

  useEffect(() => {
    const isValid =
      !errors.name &&
      !errors.imageUrl &&
      !errors.weather &&
      name.trim() &&
      imageUrl.trim() &&
      weather.trim();

    setIsFormValid(isValid);
  }, [errors, name, imageUrl, weather]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      onAddItem({ name, imageUrl, weather });
      onCloseModal();
    }
  };

  return (
    <ModalWithForm
      title="New Garment"
      buttonText="Add Garment"
      isOpen={isOpen}
      onClose={onCloseModal}
      onSubmit={handleSubmit}
      disabled={!isFormValid}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
          required
        />
        {errors.name && <span className="modal__error">{errors.name}</span>}
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image URL
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          value={imageUrl}
          onChange={handleImageUrlChange}
          required
        />
        {errors.imageUrl && (
          <span className="modal__error">{errors.imageUrl}</span>
        )}
      </label>
      <fieldset className="modal__fieldset">
        <legend className="modal__legend">Select the Weather Type:</legend>
        {["hot", "warm", "cold"].map((type) => (
          <label
            key={type}
            htmlFor={type}
            className="modal__label modal__label_type_radio"
          >
            <input
              className="modal__radio"
              name="weatherType"
              id={type}
              type="radio"
              value={type}
              checked={weather === type}
              onChange={handleWeatherChange}
            />
            <span className="modal__label_text">{type}</span>
          </label>
        ))}
        {errors.weather && (
          <span className="modal__error">{errors.weather}</span>
        )}
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
