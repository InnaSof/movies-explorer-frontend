import React, { useContext, useEffect } from "react";
import "./Profile.css";
import useFormWithValidation from "../../utils/useFormWithValidation";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile({ onUpdateUser, profileError, onSignOut }) {

  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange, resetForm, errors, isValid } = useFormWithValidation();
  const [isProfileEdit, setIsProfileEdit] = React.useState(false);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser(values);
  }

  useEffect(() => {
    currentUser.name !== values.name || currentUser.email !== values.email ?
      setIsProfileEdit(true) : setIsProfileEdit(false);
  }, [currentUser.name, currentUser.email, values.email, values.name]);


  useEffect(() => {
    resetForm({ name: currentUser.name, email: currentUser.email }, {}, false)
  }, [resetForm, currentUser])

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
            className={`profile__btn-edit ${!isValid && 'profile__btn-edit_disabled'}`}
            type="submit"
            disabled={!isValid && !isProfileEdit}
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
