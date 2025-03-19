// import "./ItemCard.css";
// import likeBtnActive from "../../assets/like-btn--active.png";
// import likeBtnInactive from "../../assets/like-btn--inactive.png";

// const ItemCard = ({ item, onCardClick, onCardLike, currentUser }) => {
//   // Ensure `currentUser` exists before accessing `_id`
//   const isLiked = currentUser ? item.likes.includes(currentUser._id) : false;

//   const handleLike = () => {
//     if (!currentUser) {
//       console.error("❌ User must be logged in to like items.");
//       return;
//     }
//     onCardLike(item);
//   };

//   return (
//     <div className="item">
//       <img
//         src={item.imageUrl}
//         alt={item.name}
//         className="item__image"
//         onClick={() => onCardClick(item)}
//       />
//       <div className="item__details">
//         <p className="item__details-title">{item.name}</p>
//         {currentUser && ( // Only render like button if user is logged in
//           <button className="item__like-button" onClick={handleLike}>
//             <img
//               src={isLiked ? likeBtnActive : likeBtnInactive}
//               alt={isLiked ? "Unlike" : "Like"}
//               className="item__like-icon"
//             />
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ItemCard;

// import "./ItemCard.css";
// import likeBtnActive from "../../assets/like-btn--active.png";
// import likeBtnInactive from "../../assets/like-btn--inactive.png";

// const ItemCard = ({ item, onCardClick, onCardLike, currentUser }) => {
//   if (!currentUser) return null;

//   const isLiked = item.likes.some((id) => id === currentUser?._id);

//   const isOwner = item.owner === currentUser._id;

//   const itemLikeButtonClassName = `item__like-button ${
//     isLiked ? "item__like-button_active" : ""
//   }`;

//   const handleLike = () => {
//     if (!isOwner) return;
//     onCardLike(item);
//   };

//   return (
//     <div className="item">
//       <img
//         src={item.imageUrl}
//         alt={item.name}
//         className="item__image"
//         onClick={() => onCardClick(item)}
//       />
//       <div className="item__details">
//         <p className="item__details-title">{item.name}</p>

//         {isOwner && (
//           <button className={itemLikeButtonClassName} onClick={handleLike}>
//             <img
//               src={isLiked ? likeBtnActive : likeBtnInactive}
//               alt="Like"
//               className="item__like-icon"
//             />
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ItemCard;

import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  const handleCardClick = () => {
    console.log("🟡 Item clicked:", item);
    onCardClick(item);
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={`${item.name}`}
      />
    </li>
  );
}

export default ItemCard;
