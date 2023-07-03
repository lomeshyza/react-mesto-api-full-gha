import React, { useState } from "react";

function Login({ onLogin, title, buttonText }) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!formValue.email || !formValue.password) {
      return;
    }
    const { email, password } = formValue;
    onLogin(email, password);
  };
  return (
    <section className="sign">
      <h3 className="sign__title">{title}</h3>
      <form type="submit" onSubmit={handleSubmit} className="sign__form">
        <input
          name="email"
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
          name="password"
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
     

      <button className="sign__button" type="submit">
        {buttonText}
      </button>
      </form>
    </section>
  );
}

export default Login;
