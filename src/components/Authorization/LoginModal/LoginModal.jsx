import "./LoginModal.css";
import React, { useState } from "react";
import ModalWithForm from "../../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../../hooks/useFormValidation";
import { login } from "../../../utils/auth";

const LoginModal = ({ isOpen, onClose, onAuthSuccess, setActiveModal }) => {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();
  const [authError, setAuthError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setAuthError("");

    login(values)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        onAuthSuccess(res);
        resetForm();
        onClose();
      })
      .catch((err) => {
        console.error("Login Error:", err);
        setAuthError("Invalid email or password");
      });
  };

  return (
    <ModalWithForm
      title="Log In"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      className="login__modal"
      hideSubmitButton={true} // 👈 Hide submit button for login modal
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

      {/* Custom buttons inside login modal */}
      <div className="login-modal__actions">
        <button type="submit" className="login-modal__submit">
          Log In
        </button>
        <button
          type="button"
          className="login-modal__register-btn"
          onClick={() => {
            onClose();
            setActiveModal("register");
          }}
        >
          or Register
        </button>
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;

//! remake
