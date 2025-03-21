import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import likeBtnActive from "../../assets/like-btn--active.png";
import likeBtnInactive from "../../assets/like-btn--inactive.png";

function ItemCard({ item, onCardClick, onCardLike }) {
  const { currentUser } = useContext(CurrentUserContext);
  const isOwner = item.owner === currentUser?._id;
  const isLiked = item.likes.some((id) => id === currentUser?._id);

  const itemLikeButtonClassName = `item-modal__like-button ${
    isLiked ? "item-modal__like-button_active" : ""
  }`;

  const handleLike = () => {
    onCardLike(item);
  };

  return (
    <li className="item-card">
      <div className="item-card__header">
        <h2 className="item-card__name">{item.name}</h2>
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
      <img
        onClick={() => onCardClick(item)}
        className="item-card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
