// import "./Profile.css";
// import SideBar from "../SideBar/SideBar";
// import ClothesSection from "../ClothesSection/ClothesSection";
// import avatar from "../../assets/images_header/self_pixel_art.png";

// function Profile({ clothingItems, onAddItem, handleCardClick }) {
//   return (
//     <div className="profile">
//       {/* <SideBar username="James Unthank" avatar={avatar} /> */}
//       <SideBar username={currentUser.name} avatar={currentUser.avatar} />

//       <div className="profile__content">
//         <ClothesSection
//           clothingItems={clothingItems}
//           onAddItem={onAddItem}
//           handleCardClick={handleCardClick}
//         />
//       </div>
//     </div>
//   );
// }

// export default Profile;

//! remake

import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({ clothingItems, onAddItem, handleCardClick }) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

  if (!isLoggedIn || !currentUser) {
    return <div>Loading...</div>; // Prevents errors if currentUser is not loaded
  }

  return (
    <div className="profile">
      <SideBar
        username={currentUser.name}
        avatar={currentUser.avatar}
        onLogout={() => {
          console.log("Logging out...");
          localStorage.removeItem("jwt");
          window.location.reload();
        }}
      />

      <div className="profile__content">
        <ClothesSection
          clothingItems={clothingItems}
          onAddItem={onAddItem}
          handleCardClick={handleCardClick}
        />
      </div>
    </div>
  );
}

export default Profile;
