import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import { DEVICE } from "../../../utils/constants";
import useScreenWidth from "../../../utils/screenWidth";
import "./MoviesCardList.css";

function MoviesCardList({ moviesList, savedMoviesList, onLikeClick, onDeleteClick }) {
  const { pathname } = useLocation();

  const { desktop, tablet, mobile } = DEVICE;
  const screenWidth = useScreenWidth();

  const [showMovieList, setShowMovieList] = useState([]);
  const [cardsShow, setCardsShow] = useState({ total: 12, add: 3 });
  
  //  the number of cards displayed at different screen widths
  useEffect(() => {
    if (pathname === '/movies') {
      if (screenWidth > desktop.width) {
        setCardsShow(desktop.cards);
      } else if (screenWidth <= desktop.width && screenWidth > mobile.width) {
        setCardsShow(tablet.cards);
      } else {
        setCardsShow(mobile.cards);
      }
    }
  }, [screenWidth, desktop, tablet, mobile, pathname]);
  
  // adding cards when clicking on the "More" button
  function handleClickMore() {
    const start = showMovieList.length;
    const end = start + cardsShow.add;
    const add = moviesList.length - start;

    if (add > 0) {
      const newCards = moviesList.slice(start, end);
      setShowMovieList([...showMovieList, ...newCards]);
    }
  }

  // change the displayed array of movies depending on the screen screenWidth
  useEffect(() => {
    if (moviesList.length) {
      const res = moviesList.filter((item, i) => i < cardsShow.total);
      setShowMovieList(res);
    }
  }, [moviesList, cardsShow.total]);


  function getSavedMovie(arr, movie) {
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
            saved={getSavedMovie(savedMoviesList, movie)}
            onLikeClick={onLikeClick}
            onDeleteClick={onDeleteClick}
          />
        ))}
      </ul>
      <div className="card__more">
        {pathname === '/movies' && showMovieList.length >= 5 && showMovieList.length < moviesList.length && (
          <button 
            className="cards__more-button" 
            onClick={handleClickMore}
            type="button">
              Ещё
          </button>
        )}
      </div>
    </section>
  );
}

export default MoviesCardList;
