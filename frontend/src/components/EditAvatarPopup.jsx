import PopupWithForm from "./PopupWithForm.jsx";
import React, { useEffect, useRef } from 'react';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const avatarRef = useRef({});

  useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="update"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      buttonText={isLoading ? 'Сохранение...' :'Сохранить'}
      popupName="popupUpdateProfileForm"
      container="update"
      onSubmit={handleSubmit}
      
    >
      <input
        id="avatar-input"
        className="popup__form popup__form_type_update"
        type="url"
        name="popupUpdateProfile"
        placeholder="Ссылка на картинку"
        required
        ref={avatarRef}
      />
      <span className="avatar-input-error popup__message-error"></span>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
