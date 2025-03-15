import "./ItemModal.css";
import closeBtnLight from "../../assets/close-btn--light.png";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ isOpen, onClose, card, onDeleteItem }) {
  const { isLoggedIn, currentUser } = useContext(CurrentUserContext);

  const isOwner = card?.owner === currentUser?._id;

  const handleDelete = () => {
    if (onDeleteItem) {
      onDeleteItem(card);
    }
  };

  console.log("🟡 ItemModal received props:", { isOpen, card, isLoggedIn });

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""} modal--item`}>
      <div className="item-modal__content">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeBtnLight} alt="Close Modal Button" />
        </button>
        <img
          src={card?.imageUrl || ""}
          alt={card?.name || "No name"}
          className="item-modal__image"
        />
        <div className="item-modal__footer">
          <h2 className="item-modal__caption">
            {card?.name || "Unnamed Item"}
          </h2>
          <p className="item-modal__weather">
            Weather: {card?.weather || "N/A"}
          </p>

          {/* Show delete button only if user is logged in and is the item's owner */}
          {isLoggedIn && isOwner && (
            <button
              className="item-modal__delete-button"
              onClick={handleDelete}
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
