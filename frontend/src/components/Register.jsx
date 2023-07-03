import React, { useState} from "react";
import { Link, useNavigate} from "react-router-dom";


function Register({onRegister,title,buttonText}) {
  const [formValue, setFormValue] = useState({
    email:'',
    password: '',
  });
  const [errorMessage, setErrorMessage]=useState('');
 
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormValue({
      ...formValue,
      [name]: value
    });
  }
  const navigate = useNavigate();

const handleSubmit=(evt)=>{
  evt.preventDefault();
  setErrorMessage(errorMessage);
  const {email, password}=formValue;
  onRegister(email, password);
  navigate("/signin");
}
  return (
    <section className="sign">
      <h3 className="sign__title">{title}</h3>
      <p className='register__error'>{errorMessage}</p>
      <form onSubmit={handleSubmit} type="submit" className="sign__form">
        <input
          name='email'
          id="signIn-email-input"
          className="sign__input sign__input_type_email"
          type="text"
          minLength="2"
          maxLength="40"
          placeholder="Email"
          required
          value={formValue.email}
          onChange={handleChange}
        />
        <span className="signIn-email-input sign__message-error"></span>
        <input
          name='password'
          id="signIn-password-input"
          className="sign__input sign__input_type_password"
          type="text"
          minLength="2"
          maxLength="200"
          required
          placeholder="Пароль"
          value={formValue.password}
          onChange={handleChange}
        />
        <span className="signIn-password-input sign__message-error"></span>
      

      <button
        className="sign__button"
        type="submit"
      >
        {buttonText}
      </button>
      </form>
      <Link className="sign__signup" to="/signin">
        Уже зарегистрированы? Войти
      </Link>
    </section>
  );
}

export default Register;
