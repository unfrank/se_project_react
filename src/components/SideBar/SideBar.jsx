// import "./SideBar.css";

// function SideBar({ username, avatar }) {
//   return (
//     <div className="sidebar">
//       <img
//         src={avatar}
//         alt={`${username}'s avatar`}
//         className="sidebar__avatar"
//       />
//       <h2 className="sidebar__username">{username}</h2>
//     </div>
//   );
// }

// export default SideBar;

//! remake

import "./SideBar.css";

function SideBar({ username, avatar, onLogout }) {
  return (
    <div className="sidebar">
      <img
        src={avatar}
        alt={`${username}'s avatar`}
        className="sidebar__avatar"
      />
      <h2 className="sidebar__username">{username}</h2>

      <button className="sidebar__button">Change Profile Data</button>
      <button className="sidebar__button sidebar__logout" onClick={onLogout}>
        Log Out
      </button>
    </div>
  );
}

export default SideBar;
