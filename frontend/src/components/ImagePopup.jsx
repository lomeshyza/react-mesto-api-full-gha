import Popup from './Popup';

function ImagePopup({isOpen, onClose, card, container, name}) {
  
  return (
    <Popup isOpen={isOpen} name={name} container={container} onClose={onClose} >
        <img
          className="popup__picture"
          alt={card.name}
          src={card.link}
        />
        <h2 className="popup__location">{card.name}</h2>
    </Popup>
  );
}
export default ImagePopup;
