import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import { DEVICE } from "../../../utils/constants";
import useScreenWidth from "../../../utils/screenWidth";
import "./MoviesCardList.css";

function MoviesCardList({ moviesList, savedMoviesList, onLikeClick, onDeleteClick }) {
  const { pathname } = useLocation();

  const { desktop, tablet, mobile } = DEVICE;

  const [showMovieList, setShowMovieList] = useState([]);
  const screenWidth = useScreenWidth();
  const [cardsShowDetails, setCardsShowDetails] = useState({ total: 12, more: 3 });
  
  // количество отображаемых карточек при разной ширине экрана
  useEffect(() => {
    if (pathname === '/movies') {
      if (screenWidth > desktop.width) {
        setCardsShowDetails(desktop.cards);
      } else if (screenWidth <= desktop.width && screenWidth > mobile.width) {
        setCardsShowDetails(tablet.cards);
      } else {
        setCardsShowDetails(mobile.cards);
      }
    }
  }, [screenWidth, desktop, tablet, mobile, pathname]);
  
  // добавление карточек при клике по кнопке "Еще"
  function handleClickMoreMovies() {
    const start = showMovieList.length;
    const end = start + cardsShowDetails.more;
    const additional = moviesList.length - start;

    if (additional > 0) {
      const newCards = moviesList.slice(start, end);
      setShowMovieList([...showMovieList, ...newCards]);
    }
  }

  // изменяем отображаемый массив фильмов в зависимости от ширины экрана
  useEffect(() => {
    if (moviesList.length) {
      const res = moviesList.filter((item, i) => i < cardsShowDetails.total);
      setShowMovieList(res);
    }
  }, [moviesList, cardsShowDetails.total]);


  function getSavedMovieCard(arr, movie) {
    return arr.find((item) => {
      return item.movieId === (movie.id || movie.movieId);
    });
  }

  return (
    <section className="cards__movies">
      <ul className="cards__list">
        {showMovieList.map(movie => (
          <MoviesCard
            movie={movie}
            key={movie.id || movie._id}
            saved={getSavedMovieCard(savedMoviesList, movie)}
            onLikeClick={onLikeClick}
            onDeleteClick={onDeleteClick}
          />
        ))}
      </ul>
      <div className="card__more">
        {pathname === '/movies' && showMovieList.length >= 5 && showMovieList.length < moviesList.length && (
          <button 
            className="cards__more-button" 
            onClick={handleClickMoreMovies}
            type="button">
              Ещё
          </button>
        )}
      </div>
    </section>
  );
}

export default MoviesCardList;
