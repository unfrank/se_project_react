import "./ModalWithForm.css";
import closeBtn from "../../assets/close-btn--dark.png";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onClose,
  onSubmit,
  disabled,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeBtn} alt="Close Modal Button" />
        </button>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <button type="submit" className="modal__submit" disabled={disabled}>
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
