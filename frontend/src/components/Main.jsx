import React, { useContext} from 'react'
import Card from "./Card.jsx";
import { CurrentUserContext } from "../contexsts/CurrentUserContext";
import {Link} from 'react-router-dom'

function Main({ onEditProfile, onEditAvatar, onAddPlace, onCardClick, onCardDelete, cards, onCardLike }) {

  const currentUser = useContext(CurrentUserContext);
  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar">
          <div className="profile__image-change">
            <Link to="/editavatar">
            <img
              src={currentUser.avatar}
              alt="Аватар"
              className="profile__image"
              onClick={onEditAvatar}
            />
            </Link>
            
          </div>
          <div className="profile__element">
            <div className="profile__profile-info">
              <h1 className="profile__name">{currentUser.name}</h1>
              <Link to='/editprofile'>
              <button
                className="profile__edit-button"
                type="button"
                onClick={onEditProfile}
              />
              </Link>
              
            </div>
            <p className="profile__about">{currentUser.about}</p>
          </div>
        </div>
        <Link to="/addplace">
        <button
          className="profile__add-button"
          type="button"
          onClick={onAddPlace}
        />
        </Link>
        
      </section>
      <section className="cards">
        <ul className="cards__container">
          {cards.map((card) => (
           <Card  card={card} key={card._id} onCardClick={onCardClick} onCardDelete={onCardDelete} onCardLike={onCardLike}/> 
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
