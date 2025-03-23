import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const ProfileModal = ({ isOpen, onClose, onSubmit, currentUser }) => {
  return (
    <ModalWithForm
      title="Change Profile Data"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      className="change-profile__modal"
    >
      <label>
        Name*
        <input
          className="modal__input"
          type="text"
          name="name"
          defaultValue={currentUser?.name}
          required
        />
      </label>
      <label>
        Avatar
        <input
          className="modal__input"
          type="url"
          name="avatar"
          defaultValue={currentUser?.avatar}
        />
      </label>
    </ModalWithForm>
  );
};

export default ProfileModal;
