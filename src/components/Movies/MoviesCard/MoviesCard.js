import React from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";

function MoviesCard({ card }) {
  const { pathname } = useLocation();

  const [isClicked, setIsClicked] = React.useState(false);

  function handleCardClick() {
    setIsClicked(!isClicked);
  }

  return (
    <li className="card">
      <div className="card__item">
        <div className="card__wrapper">
          <div className="card__text">
            <h2 className="card__title">{card.name}</h2>
            <p className="card__duration">{card.duration}</p>
          </div>
          {pathname === '/movies'  &&
            <button 
              type="button" 
              className={`card__button card__button${isClicked ? '_active' : '_inactive'}`} 
              aria-label={`${isClicked ? 'Удалить из сохранённых' : 'Сохранить'}`}
              onClick={handleCardClick} 
            />
          }
          {pathname === '/saved-movies'  &&
            <button
              type="button" 
              className="card__button card__button_delete" 
              aria-label="Удалить из сохраненных"
            />
          }   
        </div>
        <img className="card__img" src={card.movie} alt={card.name} />
      </div>
    </li>
  );
}

export default MoviesCard;
