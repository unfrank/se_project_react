import "./SideBar.css";

function SideBar({ username, avatar }) {
  return (
    <div className="sidebar">
      <img
        src={avatar}
        alt={`${username}'s avatar`}
        className="sidebar__avatar"
      />
      <h2 className="sidebar__username">{username}</h2>
    </div>
  );
}

export default SideBar;
