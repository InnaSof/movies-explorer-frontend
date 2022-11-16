import React from 'react';
import './Register.css';
import { Link } from "react-router-dom";
import logo from '../../images/logo.svg';

function Register({ onRegister }) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }
    
  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister({ name, email, password });
  }

  return (
    <section className="register">
      <div className="register__container">
        <Link to="/">
          <img className="register__logo" src={logo} alt="Логотип" />
        </Link>
        <h2 className="register__title">Добро пожаловать!</h2>
        <form 
          className="register__form" 
          onSubmit={handleSubmit}
          noValidate="" 
        >
          <p className="register__form-text">Имя</p>
          <input
            value={name}
            className="register__input"
            type="text"
            placeholder="Имя"
            onChange={handleNameChange}
            name="name"
            id="name-input"
            required=""
            minLength={2}
            maxLength={40}
          />
          <span className="register__error" />
          <p className="register__form-text">E-mail</p>
          <input
            value={email} 
            className="register__input"
            type="email"
            placeholder="E-mail"
            onChange={handleEmailChange}
            name="email"
            id="email-input"
            required=""
            minLength={2}
            maxLength={40}
          />
          <span className="register__error" />
          <p className="register__form-text">Пароль</p>
          <input
            value={password} 
            className="register__input"
            type="password"
            placeholder="Пароль"
            onChange={handlePasswordChange} 
            name="password"
            id="password-input"
            required=""
            minLength={2}
            maxLength={40}
          />
          <span className="register__error" />
          <button className="register__button" type="submit">Зарегистрироваться</button>
        </form>
        <p className="register__text">
          Уже зарегистрированы?&nbsp;
          {<Link to="/signin" className="register__redirect-btn">Войти</Link>}
        </p>
      </div>
    </section>
  )
}

export default Register;
