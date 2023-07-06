import React, { useState, useEffect} from "react";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import ConfirmDeletePopup from "./ConfirmDeletePopup.jsx";
import ImagePopup from "./ImagePopup.jsx";
import { CurrentUserContext } from "../contexsts/CurrentUserContext";
import { api } from "../utils/Api.js";
import EditProfilePopup from "./EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import InfoToolTip from "./InfoTooltip.jsx";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import * as auth from "../utils/auth";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] =
    useState(false);
  const [isRegStatusPopupOpen, setIsRegStatusPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });
  const [openImagePopup, setOpenImagePopup] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = React.useState("");
  const navigate = useNavigate();
  //const tempLogin = useRef();
  useEffect(() => {
    Promise.all([
      api.getUserInfo(),
      api.getInitialCards() /* , tempLogin.current() */,
    ])
      .then(([profileInfo, cards]) => {
        setCurrentUser(profileInfo);
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // ______________________________________открытие/закрытие попапов__________________________
  const handleCardClick = (card) => {
    setOpenImagePopup(!openImagePopup);
    setSelectedCard({ name: card.name, link: card.link });
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
    // formProfileValidator.resetValidation ();
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
    //formAddValidator.resetValidation();
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    // formEditAvatarValidator.resetValidation();
  }
  function handleConfirmDeleteClick(card) {
    setIsConfirmDeletePopupOpen(!isConfirmDeletePopupOpen);
    setSelectedCard({ name: card.name, link: card.link, _id: card._id });
    // formConfirmDeleteValidator.resetValidation();
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setOpenImagePopup(false);
    setIsConfirmDeletePopupOpen(false);
    navigate("/mesto-react-auth");
  }
  function closeRegStatusPopup(){
    if (registrationStatus){
      navigate("/signin")
    }else{
      navigate("/signup")
    }
    setIsRegStatusPopupOpen(false);
  }
  // ______________________________________обработчики___________________________________
  function handleUpdateUser(data) {
    setIsLoading(true);
    api
      .updateUserInfo(data)
      .then((value) => {
        setCurrentUser(value);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api
      .addAvatar(data)
      .then((avatar) => {
        setCurrentUser(avatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  function handleUpdatePlace(data) {
    setIsLoading(true);
    api
      .addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then(() => {
        setRegistrationStatus(true);
      })
      .catch((err) => {
        setRegistrationStatus(false);
        console.log(err);
      }).finally(() => {
        setIsRegStatusPopupOpen(true);
      });
  }
  function handleLogin(email, password) {
    auth
      .login(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setLoggedIn(true);
          setUserEmail(`${email}`);
          navigate("/mesto-react-auth");
        }
      })
      .catch((err) => {
        console.log(err);
        setRegistrationStatus(false);
        setIsRegStatusPopupOpen(true);
      });
  }
  function handleLogout() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    navigate("/signin");
  }
  function handleTokenCheck() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((data) => {
          console.log(`Это data: ${JSON.stringify(data)}`);
          setUserEmail(`${data.email}`);
          setLoggedIn(true);
          navigate("/mesto-react-auth");
        })
        .catch((err) => console.log(err));
    }
  }
  //tempLogin.current = handleTokenCheck;
  useEffect(() => {
    handleTokenCheck();
  }, []);

  function handleCardDelete() {
    setIsLoading(true);
    api
      .deleteCard(selectedCard._id)
      .then(() => {
        const newCards = cards.filter((item) => item._id !== selectedCard._id);
        setCards(newCards);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardLike(card) {
    console.log(`Это card2: ${JSON.stringify(currentUser._id)}`);
    const isLiked = card.likes.some((i) => i === currentUser._id);
    console.log(`Это card2: ${JSON.stringify(card)}`);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div>
        <Header email={userEmail} onLogout={handleLogout} />
        <div className="page">
          <Routes>
            <Route
              path="/signin"
              element={
                <Login 
                onLogin={handleLogin} 
                title="Вход" 
                buttonText="Войти" />
              }
            />

            <Route
              path="/signup"
              element={
                <Register
                  onRegister={handleRegister}
                  title="Регистрация"
                  buttonText="Зарегистрироваться"
                />
              }
            />
            <Route
              path="/mesto-react-auth"
              element={
                <ProtectedRoute
                  element={Main}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleConfirmDeleteClick}
                  cards={cards}
                  loggedIn={loggedIn}
                />
              }
            />
  
            <Route
              path="*"
              element={
               
                loggedIn ? (
                  <Navigate to="/mesto-react-auth" />
                ) : (
                  <Navigate to="/signup" />
                )
              }
            />
             </Routes>
            <ImagePopup
              card={selectedCard}
              onClose={closeAllPopups}
              isOpen={openImagePopup}
              container="image"
              name='image'
            />

            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
              loggedIn={loggedIn}
              isLoading={isLoading}
            />

            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
              isLoading={isLoading}
            />

            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleUpdatePlace}
              isLoading={isLoading}
            />

            <ConfirmDeletePopup
              onDeleteCard={handleCardDelete}
              onClose={closeAllPopups}
              isOpen={isConfirmDeletePopupOpen}
              isLoading={isLoading}
            />
         
          
          <InfoToolTip
            container="regstatus"
            name="regstatus"
            title={
              registrationStatus
                ? "Вы успешно зарегистрировались!"
                : "Что-то пошло не так! Попробуйте ещё раз."
            }
            onClose={closeRegStatusPopup}
            isOpen={isRegStatusPopupOpen}
            isCorrect={registrationStatus}
          />
          
        </div>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
