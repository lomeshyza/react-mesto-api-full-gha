import Popup from './Popup';

function PopupWithForm({
  isOpen,
  onClose,
  onSubmit,
  name,
  title,
  buttonText,
  container,
  children,
  popupName,
}) {

  return (
    <Popup isOpen={isOpen} name={name} container={container} onClose={onClose} >
        <h3 className="popup__title">{title}</h3>
        <form type="submit" onSubmit={onSubmit}
          className={`popup__forms popup__${name}`}
          name={`${popupName}`}>
          {children}
        <button
          className={`popup__button popup__button_type_${name}`}
          type='submit'>
          {buttonText}
        </button>
        </form>
    </Popup>
  );
}

export default PopupWithForm;
