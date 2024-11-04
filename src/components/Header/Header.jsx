import "./Header.css";
import logo from "../../assets/images_header/logo.svg";
// import avatar from "../../assets/images_header/avatar.png";
import avatar from "../../assets/images_header/self_pixel_art.png";
import { filterWeatherData } from "../../utils/weatherApi";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <img className="header__logo" src={logo} />
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        + Add Clothes
      </button>
      <div className="header__user-container">
        <p className="header__username">James Unthank</p>
        <img src={avatar} alt="Porait Author" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
