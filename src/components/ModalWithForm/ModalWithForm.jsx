import "./ModalWithForm.css";
import closeBtn from "../../assets/close-btn--dark.png";
import useModalClose from "../../hooks/useModalClose";

function ModalWithForm({
  title,
  isOpen,
  onClose,
  onSubmit,
  disabled,
  className = "",
  children,
  hideSubmitButton = false,
}) {
  useModalClose(isOpen, onClose);

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""} ${className}`}>
      <div className="modal__content">
        <button type="button" className="modal__close" onClick={onClose}>
          <img src={closeBtn} alt="Close Modal Button" />
        </button>
        <h2 className="modal__title">{title}</h2>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          {!hideSubmitButton && (
            <button type="submit" className="modal__submit" disabled={disabled}>
              Submit
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
