// import likeBtnActive from "../../assets/like-btn--active.png";
// import likeBtnInactive from "../../assets/like-btn--inactive.png";
// import "./ItemCard.css";
// import { useContext } from "react";
// import CurrentUserContext from "../../contexts/CurrentUserContext";

// function ItemCard({ item, onCardClick, onCardLike }) {
//   const { currentUser } = useContext(CurrentUserContext);

//   const isOwner = item.owner === currentUser?._id;

//   const isLiked = item.likes.some((id) => id === currentUser?._id);

//   const itemLikeButtonClassName = `item__like-button ${
//     isLiked ? "item__like-button_active" : ""
//   }`;
//   const handleLike = () => {
//     onCardLike(item);
//   };
//   const handleCardClick = () => {
//     console.log("🟡 Item clicked:", item);
//     onCardClick(item);
//   };

//   return (
//     <li className="card">
//       <h2 className="card__name">{item.name}</h2>
//       <img
//         onClick={() => onCardClick(item)}
//         className="card__image"
//         src={item.imageUrl}
//         alt={item.name}
//       />

//       {/* Show like button only if the user owns this item */}
//       {isOwner && (
//         <button className={itemLikeButtonClassName} onClick={handleLike}>
//           <img
//             src={isLiked ? likeBtnActive : likeBtnInactive}
//             alt="Like"
//             className="item__like-icon"
//           />
//         </button>
//       )}
//     </li>
//   );
// }

// export default ItemCard;

//! remake

import likeBtnActive from "../../assets/like-btn--active.png";
import likeBtnInactive from "../../assets/like-btn--inactive.png";
import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const { currentUser } = useContext(CurrentUserContext);

  const isOwner = item.owner === currentUser?._id;

  const isLiked = item.likes.some((id) => id === currentUser?._id);

  const itemLikeButtonClassName = `item__like-button ${
    isLiked ? "item__like-button_active" : ""
  }`;
  const handleLike = () => {
    onCardLike(item);
  };
  // const handleCardClick = () => {
  //   console.log("🟡 Item clicked:", item);
  //   onCardClick(item);
  // };

  return (
    <li className="card">
      {/* Container for name and like button */}
      <div className="card__header">
        <h2 className="card__name">{item.name}</h2>
        {isOwner && (
          <button className={itemLikeButtonClassName} onClick={handleLike}>
            <img
              src={isLiked ? likeBtnActive : likeBtnInactive}
              alt="Like"
              className="item__like-icon"
            />
          </button>
        )}
      </div>

      {/* Image should be separate for better positioning */}
      <img
        onClick={() => onCardClick(item)}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
