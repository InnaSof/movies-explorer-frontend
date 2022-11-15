import React from 'react';
import './Login.css';
import { Link } from "react-router-dom";
import logo from '../../images/logo.svg';

function Login({ onLogin }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }
    
  function handleSubmit(evt) {
    evt.preventDefault();

    onLogin({
      email,
      password
    });
  }

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
            value={email}
            className="login__input" 
            type="email" 
            placeholder="Email" 
            onChange={handleEmailChange} 
            required
          />
          <span className="login__error" />
          <p className="login__form-text">Пароль</p>
          <input 
            value={password}
            className="login__input"
            type="password" 
            placeholder="Пароль" 
            onChange={handlePasswordChange} 
            required
          />
          <span className="login__error" />
          <button className="login__button" type="submit">Войти</button>
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
