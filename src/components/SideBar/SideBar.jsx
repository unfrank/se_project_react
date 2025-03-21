import "./SideBar.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SideBar({ onLogout, setActiveModal }) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <div className="sidebar__user-info">
        {currentUser?.avatar ? (
          <img
            src={currentUser.avatar}
            alt="User Profile"
            className="sidebar__avatar"
          />
        ) : (
          <div className="sidebar__avatar sidebar__avatar--fallback">
            {currentUser?.name ? currentUser.name[0].toUpperCase() : "?"}
          </div>
        )}
        <h2 className="sidebar__username">{currentUser?.name || "User"}</h2>
      </div>
      <button
        className="sidebar__button"
        onClick={() => {
          setActiveModal("edit-profile");
        }}
      >
        Change Profile Data
      </button>

      <button className="sidebar__button" onClick={onLogout}>
        Log Out
      </button>
    </div>
  );
}

export default SideBar;
