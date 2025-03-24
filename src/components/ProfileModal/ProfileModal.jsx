import React, { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const ProfileModal = ({ isOpen, onClose, onSubmit, currentUser }) => {
  const [formValues, setFormValues] = useState({
    name: "",
    avatar: "",
  });

  useEffect(() => {
    if (isOpen && currentUser) {
      setFormValues({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [isOpen, currentUser?._id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <ModalWithForm
      title="Change Profile Data"
      className="change-profile__modal"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formValues);
      }}
    >
      <label>
        Name*
        <input
          className="modal__input"
          type="text"
          name="name"
          value={formValues.name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Avatar
        <input
          className="modal__input"
          type="url"
          name="avatar"
          value={formValues.avatar}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default ProfileModal;
