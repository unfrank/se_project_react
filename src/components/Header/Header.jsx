import "./Header.css";
import logo from "../../assets/logo.svg";
// import avatar from "../../assets/avatar.png";
import avatar from "../../assets/self_pixel_art.png";

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logo} />
      <p className="header__date-and-location">Date, Location</p>
      <button className="header__add-clothes-btn">+ Add Clothes</button>
      <div className="header__user-container">
        <p className="header__username">Jamie Unthank</p>
        <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
