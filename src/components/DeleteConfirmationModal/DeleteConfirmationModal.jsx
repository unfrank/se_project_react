// import React from "react";
// import "./DeleteConfirmationModal.css";
// import closeBtn from "../../assets/close-btn--dark.png";

// function DeleteConfirmationModal({ isOpen, onClose, onConfirm, card }) {
//   const handleConfirm = () => {
//     if (!onConfirm) {
//       console.error("No onConfirm function passed to modal");
//       return;
//     }

//     onConfirm(card);
//   };

//   return (
//     <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
//       <div className="delete-modal__content">
//         <button type="button" className="modal__close" onClick={onClose}>
//           <img src={closeBtn} alt="Close Modal Button" />
//         </button>
//         <div className="delete-modal__text">
//           <p>Are you sure you want to delete this item?</p>
//           <p>This action is irreversible.</p>
//         </div>
//         <div className="delete-modal__actions">
//           <button
//             type="button"
//             className="delete-modal__button delete-modal__button--confirm"
//             onClick={handleConfirm}
//           >
//             Yes, delete item
//           </button>
//           <button
//             type="button"
//             className="delete-modal__button delete-modal__button--cancel"
//             onClick={() => {
//               onClose();
//             }}
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DeleteConfirmationModal;

import React, { useEffect } from "react";
import "./DeleteConfirmationModal.css";
import closeBtn from "../../assets/close-btn--dark.png";

function DeleteConfirmationModal({ isOpen, onClose, onConfirm, card }) {
  useEffect(() => {
    console.log("[DeleteConfirmationModal] Props on update:", { isOpen, card });
  }, [isOpen, card]);

  const handleConfirm = () => {
    if (!onConfirm) {
      console.error("[DeleteConfirmationModal] onConfirm is not defined.");
      return;
    }

    console.log(
      "[DeleteConfirmationModal] Confirm button clicked for card:",
      card
    );
    onConfirm(card); // Trigger the delete confirmation callback
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
            onClick={() => {
              console.log("[DeleteConfirmationModal] Cancel button clicked");
              onClose();
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
