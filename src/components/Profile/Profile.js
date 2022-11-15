import React from "react";
import './Profile.css';
import { Link } from "react-router-dom";

function Profile() {
  return (
    <section className="profile">
      <div className="profile__container">
        <h2 className="profile__title">Привет, Виталий!</h2>
        <form className="profile__form">
          <div className="profile__form-field">
            <span className="profile__form-text">Имя</span>
            <input 
              className="profile__form-input" 
              type="text" 
              name="profileName" 
              defaultValue="Виталий"
            />
          </div>
          <div className="profile__form-field">
            <span className="profile__form-text">E-mail</span>
            <input
              className="profile__form-input" 
              type="email" 
              name="profileEmail" 
              defaultValue="pochta@yandex.ru" 
            />
          </div>
        </form>
        <button className="profile__btn-edit" type="button">Редактировать</button>
        <Link to="/signin" className="profile__btn-exit">
          Выйти из аккаунта
        </Link>
      </div>
    </section>
  );
}

export default Profile;
