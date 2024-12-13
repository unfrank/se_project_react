import React from "react";
import "./DeleteConfirmationModal.css";
import closeBtn from "../../assets/close-btn--dark.png";

function DeleteConfirmationModal({ isOpen, onClose, onConfirm, card }) {
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm(card)
        .then(() => {
          closeActiveModal();
        })
        .catch((err) => {
          console.error("Error deleting item:", err);
        });
    } else {
      console.error("onConfirm is not defined");
    }
  };

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="delete-modal__content">
        <button type="button" className="modal__close" onClick={onClose}>
          <img src={closeBtn} alt="Close Modal Button" />
        </button>
        <div className="delete-modal__text">
          <p>Are you sure you want to delete this item?</p>
          <p>This action is irreversible.</p>
        </div>
        <div className="delete-modal__actions">
          <button
            type="button"
            className="delete-modal__button delete-modal__button--confirm"
            onClick={handleConfirm}
          >
            Yes, delete item
          </button>
          <button
            type="button"
            className="delete-modal__button delete-modal__button--cancel"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
