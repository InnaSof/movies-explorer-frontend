import React, { useContext, useEffect } from "react";
import './Profile.css';
import { Link } from "react-router-dom";
import useFormWithValidation from "../../utils/useFormWithValidation";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile({ onUpdateUser, profileError, onSignOut }) {

  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange, resetForm, errors, isValid } = useFormWithValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser(values.name, values.email);
  }

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  return (
    <section className="profile">
      <div className="profile__container">
        <h2 className="profile__title">Привет, {currentUser.name}!</h2>
        <form 
          className="profile__form"
          onSubmit={handleSubmit}
          noValidate="" 
        >
          <div className="profile__form-field">
            <label className="profile__form-label">
              <p className="profile__form-text">Имя</p>
              <input
                defaultValue={currentUser.name}
                className="profile__form-input"
                type="text"
                placeholder="Имя"
                onChange={handleChange}
                name="profileName"
                id="name-input"
                required
                minLength={2}
                maxLength={40}
              />
            </label>
            <span className="profile__error">{errors.name}</span>
          </div>
          
          <div className="profile__form-field">
            <label className="profile__form-label">
              <p className="profile__form-text">E-mail</p>
              <input
                defaultValue={currentUser.email}
                className="profile__form-input"
                type="email"
                placeholder="E-mail"
                onChange={handleChange}
                name="profileEmail"
                id="email-input"
                required
                minLength={2}
                maxLength={40}
              />
            </label>
            <span className="profile__error">{errors.email}</span>
            <span className="profile__error">{profileError}</span>
          </div>
        </form>
        <button 
          className={`profile__btn-edit ${!isValid && 'profile__btn-edit_disabled'}`}
          type="submit"
          disabled={isValid ? true : false}
          >
            Редактировать
        </button>
        <Link to="/signin" className="profile__btn-exit" onClick={onSignOut}>
          Выйти из аккаунта
        </Link>
      </div>
    </section>
  );
}

export default Profile;
