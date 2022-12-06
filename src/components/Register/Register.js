import React, { useEffect } from 'react';
import './Register.css';
import { Link } from "react-router-dom";
import logo from '../../images/logo.svg';
import useFormWithValidation from "../../utils/useFormWithValidation";

function Register({ onRegister, registerError }) {

  const { values, handleChange, resetForm, errors, isValid } = useFormWithValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(values);
  }

  useEffect(() => {
    resetForm();
  }, [resetForm]);

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
            value={values.name || ''}
            className="register__input"
            type="text"
            placeholder="Имя"
            onChange={handleChange}
            name="name"
            id="name-input"
            required
            minLength={2}
            maxLength={40}
          />
          <span className="register__error">{errors.name}</span>
          <p className="register__form-text">E-mail</p>
          <input
            value={values.email || ''}
            className="register__input"
            type="email"
            placeholder="E-mail"
            onChange={handleChange}
            name="email"
            id="email-input"
            required
            minLength={2}
            maxLength={40}
          />
          <span className="register__error">{errors.email}</span>
          <p className="register__form-text">Пароль</p>
          <input
            value={values.password || ''}
            className="register__input"
            type="password"
            placeholder="Пароль"
            onChange={handleChange}
            name="password"
            id="password-input"
            required
            minLength={2}
            maxLength={40}
          />
          <span className="register__error">{errors.password}</span>
          <span className="register__error-server">{registerError}</span>
          <button 
            className={`register__button ${!isValid && 'register__button_disabled'}`}
            type="submit"
            disabled={!isValid}
            >
              Зарегистрироваться
          </button>
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
