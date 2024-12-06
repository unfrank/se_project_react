import "./Header.css";
import logo from "../../assets/images_header/logo.svg";
// import avatar from "../../assets/images_header/avatar.png";
import avatar from "../../assets/images_header/self_pixel_art.png";
import { filterWeatherData } from "../../utils/weatherApi";
import ToggleSwitch from "../../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
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
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-btn"
        >
          + Add Clothes
        </button>
        <Link to="/profile" className="header__profile">
          <p className="header__username">James Unthank</p>
          <img
            src={avatar}
            alt="User Profile Picture"
            className="header__avatar"
          />
        </Link>
      </div>
    </header>
  );
}

export default Header;
