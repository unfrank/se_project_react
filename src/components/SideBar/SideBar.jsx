import "./SideBar.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SideBar({ onLogout }) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <div className="sidebar__user-info">
        <img
          src={currentUser?.avatar}
          alt="User Profile"
          className="sidebar__avatar"
        />
        <h2 className="sidebar__username">{currentUser?.name}</h2>
      </div>

      <button className="sidebar__button">Change Profile Data</button>
      <button className="sidebar__button sidebar__logout" onClick={onLogout}>
        Log Out
      </button>
    </div>
  );
}

export default SideBar;
