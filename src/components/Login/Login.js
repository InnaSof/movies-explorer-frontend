import React, { useEffect } from 'react';
import './Login.css';
import { Link } from "react-router-dom";
import logo from '../../images/logo.svg';
import useFormWithValidation from "../../utils/useFormWithValidation";

function Login({ onLogin, loginError }) {

  const { values, handleChange, resetForm, errors, isValid } = useFormWithValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin(values);
  }

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  return(
    <section className="login">
      <div className="login__container">
        <Link to="/">
          <img className="login__logo" src={logo} alt="Логотип" />
        </Link>
        <h2 className="login__title">Рады видеть!</h2>
        <form className="login__form" onSubmit={handleSubmit}>
          <p className="login__form-text">E-mail</p>
          <input
            value={values.email || ''}
            className="login__input"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            name="email"
            id="email-input"
            required
            minLength={2}
            maxLength={40}
          />
          <span className="login__error">{errors.email}</span>
          <p className="login__form-text">Пароль</p>
          <input
            value={values.password || ''}
            className="login__input"
            type="password"
            placeholder="Пароль"
            onChange={handleChange}
            name="password"
            id="password-input"
            required
            minLength={2}
            maxLength={40}
          />
          <span className="login__error">{errors.password}</span>
          <span className="login__error-server">{loginError}</span>
          <button 
            className={`login__button ${!isValid && 'login__button_disabled'}`}
            type="submit"
            disabled={!isValid}
            >
              Войти
          </button>
        </form>
        <p className="login__text">
          Ещё не зарегистрированы?&nbsp;
          {<Link to="/signup" className="login__redirect-btn">Регистрация</Link>}
        </p>
      </div>
    </section>
  )
}

export default Login;
