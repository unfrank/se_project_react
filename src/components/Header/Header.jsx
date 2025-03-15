// import "./Header.css";
// import logo from "../../assets/images_header/logo.svg";
// import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
// import { Link } from "react-router-dom";
// import React, { useContext } from "react";
// import CurrentUserContext from "../../contexts/CurrentUserContext";

// function Header({ handleAddClick, weatherData, onLogout, onLogin, onSignUp }) {
//   const currentDate = new Date().toLocaleString("default", {
//     month: "long",
//     day: "numeric",
//   });

//   const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

//   return (
//     <header className="header">
//       <Link to="/" className="header__logo">
//         <img className="header__logo" src={logo} alt="WTWR Logo" />
//       </Link>
//       <p className="header__date-and-location">
//         {currentDate}, {weatherData.city}
//       </p>

//       <div className="header__user-container">
//         <ToggleSwitch />
//         {isLoggedIn ? (
//           <>
//             <button
//               onClick={onLogout}
//               type="button"
//               className="header__logout-btn"
//             >
//               Log Out
//             </button>
//             <div className="header__profile">
//               <p className="header__username">{currentUser?.name || "User"}</p>
//               {currentUser?.avatar ? (
//                 <img
//                   src={currentUser.avatar}
//                   alt="User Profile"
//                   className="header__avatar"
//                 />
//               ) : (
//                 <div className="header__avatar header__avatar--fallback">
//                   {currentUser.name[0].toUpperCase()}
//                 </div>
//               )}
//             </div>
//           </>
//         ) : (
//           <>
//             <button onClick={onSignUp} className="header__auth-btn">
//               Sign Up
//             </button>
//             <button onClick={onLogin} className="header__auth-btn">
//               Log In
//             </button>
//           </>
//         )}
//       </div>
//     </header>
//   );
// }

// export default Header;

//! remake

import "./Header.css";
import logo from "../../assets/images_header/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({ weatherData, onLogout, onLogin, onSignUp, onAddItem }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

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
              onClick={() => {
                console.log("🟡 `+ Add Clothes` button clicked!");
                if (typeof onAddItem === "function") {
                  onAddItem(); // ✅ Correctly calls the function from App.jsx
                } else {
                  console.error("❌ `onAddItem` is not a function!");
                }
              }}
              type="button"
              className="header__add-clothes-btn"
            >
              + Add Clothes
            </button>

            <button
              onClick={onLogout}
              type="button"
              className="header__logout-btn"
            >
              Log Out
            </button>
            <div className="header__profile">
              <p className="header__username">{currentUser?.name || "User"}</p>
              {currentUser?.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt="User Profile"
                  className="header__avatar"
                />
              ) : (
                <div className="header__avatar header__avatar--fallback">
                  {currentUser.name[0].toUpperCase()}
                </div>
              )}
            </div>
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
