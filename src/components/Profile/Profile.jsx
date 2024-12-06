import "./Profile.css";
import SideBar from "../../Sidebar/Sidebar";
import ClothesSection from "../ClothesSection/ClothesSection";
import avatar from "../../assets/images_header/self_pixel_art.png";

function Profile({ clothingItems, onAddItem, handleCardClick }) {
  return (
    <div className="profile">
      <div className="profile__header">
        <SideBar username="James Unthank" avatar={avatar} />
      </div>
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
