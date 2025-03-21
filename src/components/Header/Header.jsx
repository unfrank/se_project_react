import "./Header.css";
import logo from "../../assets/images_header/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({ weatherData, onLogin, onSignUp, onAddItem }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

  const getUserAvatar = () => {
    if (currentUser?.avatar) {
      return (
        <img
          src={currentUser.avatar}
          alt="User Profile"
          className="header__avatar"
        />
      );
    }
    const fallbackLetter = currentUser?.name
      ? currentUser.name[0].toUpperCase()
      : "?";
    return (
      <div className="header__avatar header__avatar--fallback">
        {fallbackLetter}
      </div>
    );
  };

  return (
    <header className="header">
      <Link to="/" className="header__logo">
        <img className="header__logo" src={logo} alt="WTWR Logo" />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>

      <div className="header__user-container">
        <ToggleSwitch />

        {isLoggedIn ? (
          <>
            <button
              onClick={onAddItem}
              type="button"
              className="header__add-clothes-btn"
            >
              + Add Clothes
            </button>
            <Link to="/profile" className="header__profile">
              <p className="header__username">{currentUser?.name || "User"}</p>
              {getUserAvatar()}
            </Link>
          </>
        ) : (
          <>
            <button onClick={onSignUp} className="header__auth-btn">
              Sign Up
            </button>
            <button onClick={onLogin} className="header__auth-btn">
              Log In
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
