import React, { useContext, useEffect } from "react";
import "./Profile.css";
import useFormWithValidation from "../../utils/useFormWithValidation";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile({ onUpdateUser, profileError, onSignOut }) {
  const { values, handleChange, resetForm, errors, isValid } = useFormWithValidation();
  const currentUser = useContext(CurrentUserContext);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(values);
  }

  const validity = (!isValid || (currentUser.name === values.name && currentUser.email === values.email));
  
  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser, {}, true);
    }
  }, [currentUser, resetForm]);

  return (
    <section className="profile">
      <div className="profile__container">
        <h2 className="profile__title">Привет, {currentUser.name}!</h2>
        <form 
          className="profile__form"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="profile__form-field">
            <label className="profile__form-label">
              <p className="profile__form-text">Имя</p>
              <input
                value={values.name || ''}
                className="profile__form-input"
                type="text"
                placeholder="Имя"
                onChange={handleChange}
                pattern='^(?!\s)[A-Za-zА-Яа-я\-\s]+$'
                name="name"
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
                value={values.email || ''}
                className="profile__form-input"
                type="email"
                placeholder="E-mail"
                onChange={handleChange}
                pattern='^.+@.+\..+$'
                name="email"
                id="email-input"
                required
                minLength={2}
                maxLength={40}
              />
            </label>
            <span className="profile__error">{errors.email}</span>
            <span className="profile__error-server">{profileError}</span>
          </div>
          <button 
            className={`profile__btn-edit ${validity ? 'profile__btn-edit_disabled' : ''}`}
            type="submit"
            disabled={validity ? true : false}
          >
            Редактировать
          </button>
        </form>
        <button 
          className="profile__btn-exit" 
          type="button"
          onClick={onSignOut}>
            Выйти из аккаунта
        </button>
      </div>
    </section>
  );
}

export default Profile;
