import headerLogo from "../images/logo_mesto.svg";
import { Link, Routes, Route } from 'react-router-dom';

function Header({email, onLogout}) {
  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="Логотип Место" />
    
    <Routes>
      <Route path="/signup" element={
        <Link to='/signin' className="header__sign-link">Войти</Link>
      }>
      </Route>
      <Route path="/signin" element={
        <Link to='/signup' className="header__sign-link">Регистрация</Link>
      }>
      </Route>
      
      <Route path="/mesto-react-auth" element={
        <div className="header__container">
          <p className="header__email">{email}</p>
          <Link to='/signup' className="header__sign-link" onClick={onLogout}>Выйти</Link>
        </div>
      }>
      </Route>
    </Routes>
    </header>
  );
}

export default Header;
