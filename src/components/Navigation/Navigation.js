import React from "react";
import "./Navigation.css";
import { NavLink } from "react-router-dom";
import accountIcon from "../../images/account-icon.svg";

function Navigation({ isOpen, onClose }) {
  return (
    <section className={`navigation ${isOpen ? "navigation_opened" : ""}`}>
      <div className="navigation__container">
        <button 
          className="navigation__close-btn" 
          type="button"
          onClick={onClose}>
        </button>
        <ul className="navigation__list">
          <li className="navigation__list-item">
            <NavLink to="/"
              className="navigation__link">
                Главная
            </NavLink>
          </li>
          <li className="navigation__list-item">
            <NavLink to="/movies"
              className="navigation__link"
              activeClassName="navigation__link_active">
                Фильмы
            </NavLink>
          </li>
          <li className="navigation__list-item">
            <NavLink to="/saved-movies" 
              className="navigation__link"
              activeClassName="navigation__link_active">
                Сохранённые фильмы
            </NavLink>
          </li>
        </ul>
        <nav className="navigation__wrapper">
          <NavLink to="/profile"
            className="navigation__link-profile">
              Аккаунт
          </NavLink>
          <NavLink to="/profile">
            <img className="navigation__account-img" src={accountIcon} alt="изображение человечка" />
          </NavLink>
        </nav>
      </div>
    </section>

  );
}

export default Navigation;
