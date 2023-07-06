import React from "react";
import { CurrentUserContext } from '../contexsts/CurrentUserContext';
import {Link} from 'react-router-dom';


function Card({onCardClick, card, onCardDelete, onCardLike}) {
  console.log(`Это card: ${JSON.stringify(card)}`);
  
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;

  const isLiked = card.likes.some(i => i === currentUser._id);
 
  const cardLikeButtonClassName = ( 
    `card__like-button ${isLiked && 'card__like-button_active'}` 
  );
  const handleClick = () => {
    onCardClick(card);
  };
  function handleDeleteClick () {
    onCardDelete(card)
  };
  function handleLikeClick (){
    onCardLike(card)
  }
  return (
    <li className="card">
      <Link to="/confirmdelete">
      {isOwn && <button className="card__basket" type="button" onClick={handleDeleteClick}/>}
      </Link>
      
      <Link to ={`cards/${card._id}`}replace>
      <img
        className="card__image"
        alt={card.name}
        src={card.link}
        onClick={handleClick}
      />
      </Link>
      
      <div className="card__footer">
        <h2 className="card__location">{card.name}</h2>
        <div className="card__likes-group">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
          <div className="card__like-counter">{card.likes.length}</div>
        </div>
      </div>
    </li>

  );
}
export default Card;
