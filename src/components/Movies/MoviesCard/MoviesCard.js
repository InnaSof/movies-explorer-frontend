import React from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";

function MoviesCard({ movie, onDeleteMovie, onSaveMovie }) {
  const { pathname } = useLocation();
  const [isClickedLike, setIsClickedLike] = React.useState(false);

  function handleDeleteMovie() {
    setIsClickedLike(false);
    onDeleteMovie(movie);
  }

  function handleSaveMovie() {
    setIsClickedLike(true);
    onSaveMovie(movie);
  }

  function movieDuration(min) {
    return `${Math.floor(min / 60)}ч ${min % 60}мин`;
  }
  const serverUrl = 'https://api.nomoreparties.co';
  
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
              className={`card__button card__button${isClickedLike ? '_active' : '_inactive'}`} 
              aria-label={`${isClickedLike ? 'Удалить из сохранённых' : 'Сохранить'}`}
              onClick={isClickedLike ? handleDeleteMovie : handleSaveMovie}
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
          <img 
            className="card__img" 
            src={pathname === '/movies' ? serverUrl + movie.image.url : movie.image}
            alt={movie.nameRU} 
          />
        </a>
      </div>
    </li>
  );
}

export default MoviesCard;
