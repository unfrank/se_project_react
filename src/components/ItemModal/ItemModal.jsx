import "./ItemModal.css";
import closeBtnLight from "../../assets/close-btn--light.png";

function ItemModal({ isOpen, onClose, card, onDeleteItem }) {
  const handleDelete = () => {
    if (onDeleteItem) {
      onDeleteItem(card);
    } else {
      console.error("onDeleteItem is undefined");
    }
  };

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""} modal--item`}>
      <div className="item-modal__content">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeBtnLight} alt="Close Modal Button" />
        </button>
        <img src={card.link} alt={card.name} className="item-modal__image" />
        <div className="item-modal__footer">
          <h2 className="item-modal__caption">{card.name}</h2>
          <p className="item-modal__weather">Weather: {card.weather}</p>
          <button className="item-modal__delete-button" onClick={handleDelete}>
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
