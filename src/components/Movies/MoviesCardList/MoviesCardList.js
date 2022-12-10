import React from "react";
import { Route } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

function MoviesCardList({ movies, onSaveMovie, onDeleteMovie, savedMovies, onRenderMovies, moreButtonLoad }) {
  return (
    <section className="cards__movies">
      <ul className="cards__list">
        {movies.map((movie) => (
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
        <Route exact path="/movies">
          <button 
            className={moreButtonLoad ? `cards__more-button` : `cards__more-button_hidden`}
            type="button"
            onClick={onRenderMovies}
          >
            Ещё
          </button>
        </Route>
      </div>
    </section>
  );
}

export default MoviesCardList;
