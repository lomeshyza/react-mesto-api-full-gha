import PopupWithForm from "./PopupWithForm.jsx";

function ConfirmDeletePopup({ isOpen, onClose, onDeleteCard, isLoading }) {

  function handleSubmit(evt) {
    evt.preventDefault();
    onDeleteCard();
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? 'Удаление...' :'Да'}
      name="confirm"
      title="Вы уверены?"
      container="confirm"
    />
  );
}
export default ConfirmDeletePopup;
