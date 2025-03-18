// import { useContext } from "react";
// import CurrentUserContext from "../../contexts/CurrentUserContext";

// import "./Profile.css";
// import SideBar from "../SideBar/SideBar";
// import ClothesSection from "../ClothesSection/ClothesSection";

// function Profile({ clothingItems, onAddItem, handleCardClick }) {
//   const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

//   if (!isLoggedIn || !currentUser) {
//     return <div>Loading...</div>; // Prevents errors if currentUser is not loaded
//   }

//   return (
//     <div className="profile">
//       <SideBar
//         username={currentUser.name}
//         avatar={currentUser.avatar}
//         onLogout={() => {
//           console.log("Logging out...");
//           localStorage.removeItem("jwt");
//           window.location.reload();
//         }}
//       />

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
    return <div>Loading...</div>;
  }

  return (
    <div className="profile">
      {/* Sidebar takes only needed space */}
      <SideBar
        username={currentUser.name}
        avatar={currentUser.avatar}
        onLogout={() => {
          localStorage.removeItem("jwt");
          window.location.reload();
        }}
      />

      {/* Clothes section dynamically expands */}
      <ClothesSection
        clothingItems={clothingItems}
        onAddItem={onAddItem}
        handleCardClick={handleCardClick}
      />
    </div>
  );
}

export default Profile;
