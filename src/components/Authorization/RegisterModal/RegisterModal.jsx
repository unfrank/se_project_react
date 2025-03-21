import React, { useState, useContext } from "react";
import ModalWithForm from "../../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../../hooks/useFormValidation";

const RegisterModal = ({ isOpen, onClose, onRegister }) => {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();
  const [authError, setAuthError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setAuthError("");

    onRegister(values)
      .then((res) => {
        resetForm();
        onClose();
      })
      .catch((err) => {
        setAuthError("Error during registration");
      });
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      disabled={!isValid}
      className="register__modal"
    >
      {authError && <span className="modal__error">{authError}</span>}

      <label className="modal__label">
        Email
        <input
          type="email"
          name="email"
          value={values.email || ""}
          onChange={handleChange}
          required
          className="modal__input"
        />
        {errors.email && <span className="modal__error">{errors.email}</span>}
      </label>
      <label className="modal__label">
        Password
        <input
          type="password"
          name="password"
          value={values.password || ""}
          onChange={handleChange}
          required
          className="modal__input"
        />
        {errors.password && (
          <span className="modal__error">{errors.password}</span>
        )}
      </label>
      <label className="modal__label">
        Name
        <input
          type="text"
          name="name"
          value={values.name || ""}
          onChange={handleChange}
          required
          className="modal__input"
        />
        {errors.name && <span className="modal__error">{errors.name}</span>}
      </label>
      <label className="modal__label">
        Avatar URL
        <input
          type="url"
          name="avatar"
          value={values.avatar || ""}
          onChange={handleChange}
          className="modal__input"
        />
        {errors.avatar && <span className="modal__error">{errors.avatar}</span>}
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
