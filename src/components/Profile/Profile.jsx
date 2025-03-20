// import { useContext } from "react";
// import CurrentUserContext from "../../contexts/CurrentUserContext";

// import "./Profile.css";
// import SideBar from "../SideBar/SideBar";
// import ClothesSection from "../ClothesSection/ClothesSection";

// function Profile({
//   clothingItems,
//   onAddItem,
//   handleCardClick,
//   setActiveModal,
// }) {
//   const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

//   if (!isLoggedIn || !currentUser) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="profile">
//       <SideBar
//         username={currentUser.name}
//         avatar={currentUser.avatar}
//         onLogout={() => {
//           localStorage.removeItem("jwt");
//           window.location.reload();
//         }}
//         setActiveModal={setActiveModal}
//       />
//       <ClothesSection
//         clothingItems={clothingItems}
//         onAddItem={onAddItem}
//         handleCardClick={handleCardClick}
//       />
//     </div>
//   );
// }

// export default Profile;

//!remake

import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  clothingItems,
  onAddItem,
  handleCardClick,
  setActiveModal,
  onCardLike,
  // currentUser,
}) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

  if (!isLoggedIn || !currentUser) {
    return <div>Loading...</div>;
  }

  const userItems = clothingItems.filter(
    (item) => item.owner === currentUser._id
  );

  return (
    <div className="profile">
      <SideBar
        username={currentUser.name}
        avatar={currentUser.avatar}
        onLogout={() => {
          localStorage.removeItem("jwt");
          window.location.reload();
        }}
        setActiveModal={setActiveModal}
      />
      <ClothesSection
        clothingItems={userItems}
        onAddItem={onAddItem}
        handleCardClick={handleCardClick}
        onCardLike={onCardLike}
      />
    </div>
  );
}

export default Profile;
