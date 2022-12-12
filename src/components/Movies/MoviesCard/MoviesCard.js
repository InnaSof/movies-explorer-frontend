import React from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";

function MoviesCard({ movie, saved, onLikeClick, onDeleteClick }) {
  const { pathname } = useLocation();

  // сохранение фильма
  function handleLikeMovie() {
    onLikeClick(movie);
  }

  // удаление фильма
  function handleDeleteMovie() {
    onDeleteClick(movie);
  }

  const serverUrl = 'https://api.nomoreparties.co';

  function movieDuration(time) {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    return hours + "ч " + minutes + "м";
  }

  return (
    <li className="movie">
      <div className="card__item">
        <div className="card__wrapper">
          <div className="card__text">
            <h2 className="card__title">{movie.nameRU}</h2>
            <p className="card__duration">{movieDuration(movie.duration)}</p>
          </div>
          {pathname === '/movies'  &&
            <button 
              type="button" 
              className={`card__button card__button${saved ? '_active' : '_inactive'}`} 
              aria-label={`${saved ? 'Удалить из сохранённых' : 'Сохранить'}`}
              onClick={saved ? handleDeleteMovie : handleLikeMovie}
            />
          }
          {pathname === '/saved-movies'  &&
            <button
              type="button" 
              className="card__button card__button_delete" 
              aria-label="Удалить из сохраненных"
              onClick={handleDeleteMovie}
            />
          }   
        </div>
        <a href={movie.trailerLink} target="_blank" rel="noreferrer">
          <img className="card__img" src={pathname === '/movies' ? serverUrl + movie.image.url : movie.image} alt={movie.nameRU} />
        </a>
      </div>
    </li>
  );
}

export default MoviesCard;
