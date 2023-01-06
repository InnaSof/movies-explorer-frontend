import React, { useState, useContext, useEffect } from "react";
import "./Movies.css";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Preloader from "../Movies/Preloader/Preloader";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { filterMovies, filterShortMovies } from "../../utils/filterMovies";
import moviesApi from "../../utils/MoviesApi";

function Movies({ onLikeClick, onDeleteClick, savedMoviesList }) {
  const currentUser = useContext(CurrentUserContext);

  const [checked, setChecked] = useState(
    JSON.parse(localStorage.getItem('checked')) ?? false
  );
  const [initialMovies, setInitialMovies] = useState([]); // movies received from the request
  const [filteredMovies, setFilteredMovies] = useState([]); // movies filtered by checkbox and query
  const [isAllMovies, setIsAllMovies] = useState([]); //all movies from the server
  const [isNotFound, setIsNotFound] = useState(false); // state found or not
  const [isFetching, setIsFetching] = useState(false); // data loading
  const [searchError, setSearchError] = useState(""); // error state

  // checkbox handler
  function handleShortMovies() {
    setChecked(!checked);
    if (!checked) {
      setFilteredMovies(filterShortMovies(initialMovies));
    } else {
      setFilteredMovies(initialMovies);
    }
    localStorage.setItem('checked', !checked);
  }
  
    // render movies from local storage
  useEffect(() => {
    if (localStorage.getItem('movies')) {
      const movies = JSON.parse(localStorage.getItem('movies'));
      setInitialMovies(movies);
      if (
        localStorage.getItem('checked') === 'true'
      ) {
        setFilteredMovies(filterShortMovies(movies));
      } else {
        setFilteredMovies(movies);
      }
    }
  }, [currentUser]);

  // array lookup and state setting
  function handleFilteredMovies(movies, userRequest, shortMoviesCheckbox) {
    setIsAllMovies(movies);
    const moviesList = filterMovies(movies, userRequest, shortMoviesCheckbox);
    if (moviesList.length === 0) {
      setIsNotFound(true);
      setSearchError('Ничего не найдено');
    } else {
      setInitialMovies(moviesList);
      setIsNotFound(false);
      setFilteredMovies(
        shortMoviesCheckbox ? filterShortMovies(moviesList) : moviesList
      );
      localStorage.setItem('movies', JSON.stringify(moviesList));
    }
  }

  // search by request
  function handleSearchMovies(inputValue) {
    setIsFetching(true);
    setTimeout(() => {
      localStorage.setItem('searchText', inputValue);
      localStorage.setItem('checked', checked);

      if (isAllMovies.length === 0) {
        moviesApi.getMovies()
          .then(movies => {
            handleFilteredMovies(
              movies,
              inputValue,
              checked
            );
          })
          .catch(() => {
            setSearchError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
          })
      } else {
        handleFilteredMovies(isAllMovies, inputValue, checked);
      }
      setIsFetching(false);
    }, 600);
  }

  return (
    <main className="movies">
      <SearchForm
        handleSearchSubmit={handleSearchMovies}
        handleShortMovies={handleShortMovies}
        checked={checked}
      />
     { isFetching ? <Preloader /> 
     : !isNotFound ? (
        <MoviesCardList
          moviesList={filteredMovies}
          savedMoviesList={savedMoviesList}
          onLikeClick={onLikeClick}
          onDeleteClick={onDeleteClick}
        />
        ) : (
          <span className="movies__nothing-found-text">{searchError}</span>
        )
      }
    </main>
  );
}

export default Movies;
