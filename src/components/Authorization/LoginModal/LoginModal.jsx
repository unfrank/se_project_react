import "./LoginModal.css";
import React, { useState } from "react";
import ModalWithForm from "../../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../../hooks/useFormValidation";
import { login } from "../../../utils/auth";

const LoginModal = ({ isOpen, onClose, onAuthSuccess, setActiveModal }) => {
  const { values, handleChange, errors, resetForm } = useFormAndValidation();
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
        setAuthError("Invalid email or password");
      });
  };

  return (
    <ModalWithForm
      title="Log In"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      className="login-modal"
      hideSubmitButton={true}
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

      <div className="login-modal__actions">
        <button type="submit" className="login-modal__submit-btn">
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
