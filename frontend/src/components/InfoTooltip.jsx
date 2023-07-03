import Popup from './Popup';

function InfoToolTip({ isOpen, onClose, container, name, title, isCorrect }) {
  
  return (
    <Popup isOpen={isOpen} name={name} container={container} onClose={onClose} >
        <div
          className={`popup__regstatus-image ${
            isCorrect
              ? "popup__regstatus-image_type_success"
              : "popup__regstatus-image_type_fail"
          }`}
        />
        <h3 className="popup__title popup__regstatus_title">{title}</h3>
    </Popup>
  );
}
export default InfoToolTip;
