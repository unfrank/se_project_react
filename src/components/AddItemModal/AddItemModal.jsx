import "./AddItemModal.css";
import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormValidation";

const AddItemModal = ({
  isOpen,
  onAddItem,
  onCloseModal,
  isLoading,
  buttonText,
}) => {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      if (typeof onAddItem !== "function") {
        return;
      }
      onAddItem(values)
        .then(() => {
          resetForm();
          onCloseModal();
        })
        .catch(console.error);
    }
  };

  React.useEffect(() => {
    if (isOpen) resetForm();
  }, [isOpen, resetForm]);

  return (
    <ModalWithForm
      title="New Garment"
      buttonText={buttonText || "Add Garment"}
      isOpen={isOpen}
      onClose={onCloseModal}
      onSubmit={handleSubmit}
      disabled={!isValid || isLoading}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="name"
          name="name"
          placeholder="Name"
          value={values.name || ""}
          onChange={handleChange}
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
          name="imageUrl"
          placeholder="Image URL"
          value={values.imageUrl || ""}
          onChange={handleChange}
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
              name="weather"
              id={type}
              type="radio"
              value={type}
              checked={values.weather === type}
              onChange={handleChange}
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
