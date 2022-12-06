import React, {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

function MoviesCardList({ 
  onSaveMovie, 
  onDeleteMovie, 
  savedMovies,
  foundMovies,
  buttonState,
 }) {

  const location = useLocation();
  
  const [maxEl, setMaxEl] = useState(12);
  const [width, setWidth] = useState(1280);
  const [visibleMovies, setVisibleMovies] = useState([]);
  const [defaultMovies, setDefaultMovies] = useState([]);

  useEffect(() => { // кол-во фильмов в зависимости от разрешения экрана
    handleSubscribe();
    if (width < 767) {
      setDefaultMovies(5);
    } else if (width < 1025) {
      setDefaultMovies(6)
    } else if (width < 1280) {
      setDefaultMovies(9);
    } else {
      setDefaultMovies(12);
    }
    if (location.pathname === '/saved-movies') {
        setMaxEl(100);
    }
  }, [foundMovies, location.pathname, width])

  function handleSubscribe() { // записываем разрешение экрана в переменную
    setWidth(window.innerWidth);
  }

  function handleMoreClick() { // в зависимости от разрешения экрана, добавляется различное количество фильмов
    if (width < 768) {
        setMaxEl(maxEl + 5);
    } else if (width < 1025) {
        setMaxEl(maxEl + 2)
    } else if (width < 1280) {
        setMaxEl(maxEl + 3);
    } else {
        setMaxEl(maxEl + 4);
    }
  }

  useEffect(() => { 
    window.addEventListener('resize', function () {
      setTimeout(handleSubscribe, 1000);
    });
    window.removeEventListener('resize', function () {
      setTimeout(handleSubscribe, 1000);
    });
  },[])

  return (
    <section className="cards__movies">
      <ul className="cards__list">
        {visibleMovies.map((movie) => (
          <MoviesCard
            movie={movie}
            key={movie.id || movie._id}
            onSaveMovie={onSaveMovie}
            onDeleteMovie={onDeleteMovie}
            savedMovies={savedMovies}
          />
        ))}
      </ul>
      <div className="card__more">
        <button 
          className={`${buttonState ? 'cards__more-button' : 'cards__more-button_hidden'}`}
          type="button"
          onClick={handleMoreClick}
        >
            Ещё
        </button>
      </div>
    </section>
  );
}

export default MoviesCardList;
