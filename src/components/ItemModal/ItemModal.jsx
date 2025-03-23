import React, { useContext, useState } from "react";
import "./ItemModal.css";
import closeBtnLight from "../../assets/close-btn--light.png";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import useModalClose from "../../hooks/useModalClose";

function ItemModal({ isOpen, onClose, card, onDeleteItem }) {
  const { isLoggedIn, currentUser } = useContext(CurrentUserContext);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const isOwner = card?.owner === currentUser?._id;

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    return onDeleteItem(card).finally(() => {
      setShowDeleteConfirm(false);
      onClose();
    });
  };
  useModalClose(isOpen, onClose);
  return (
    <>
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

            {isLoggedIn && isOwner && (
              <button
                className="item-modal__delete-button"
                onClick={handleDeleteClick}
              >
                Delete item
              </button>
            )}
          </div>
        </div>
      </div>

      <DeleteConfirmationModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleConfirmDelete}
        card={card}
      />
    </>
  );
}

export default ItemModal;
