import "./ModalWithForm.css";
import closeBtn from "../../assets/close-btn--dark.png";

function ModalWithForm({
  title,
  buttonText,
  isOpen,
  onClose,
  onSubmit,
  disabled,
  className = "",
  children,
  buttonClass = "",
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""} ${className}`}>
      <div className="modal__content">
        <button type="button" className="modal__close" onClick={onClose}>
          ✖
        </button>
        <h2 className="modal__title">{title}</h2>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          {/* <button type="submit" className="modal__submit" disabled={disabled}>
            {buttonText}
          </button> */}
          <button
            type="submit"
            className={`modal__submit ${buttonClass || ""}`}
            disabled={disabled}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
