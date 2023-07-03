import PopupWithForm from "./PopupWithForm.jsx";
import React, {useEffect } from 'react';
//import { useFormAndValidation } from "../hooks/useFormAndValidation.js";

function AddPlacePopup ({isOpen, onClose, onAddPlace, isLoading}){
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleChangeName(evt) {
   setName(evt.target.value);
 }
 function handleChangeLink(evt) {
   setLink(evt.target.value);
 }
   function handleSubmit(evt) {
       evt.preventDefault();
       onAddPlace({ name, link });
 }
 useEffect(() => {
   setName('');
   setLink('');
}, [isOpen]);


   
   return(
       <PopupWithForm
       name="add"
       title="Новое место"
       buttonText={isLoading ? 'Создание...' :'Создать'}
       popupName="popupPlaceForm"
       container="form"
       isOpen={isOpen}
       onClose={onClose}
       onSubmit={handleSubmit}

     >
       <input
         id="place-input"
         className="popup__form popup__form_type_place"
         type="text"
         name="popupPlace"
         minLength="2"
         maxLength="30"
         placeholder="Название"
         required
         value={name}
         onChange={handleChangeName}
       />
       <span className="place-input-error popup__message-error"></span>
       <input
         id="link-input"
         className="popup__form popup__form_type_image"
         type="url"
         name="popupPlaceLink"
         placeholder="Ссылка на картинку"
         required
         value={link}
         onChange={handleChangeLink}
       />
       <span className="link-input-error popup__message-error"></span>
     </PopupWithForm>
   )
}
export default AddPlacePopup;