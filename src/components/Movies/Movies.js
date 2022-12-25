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

  const [checked, setChecked] = useState(false); // checkbox state
  const [initialMovies, setInitialMovies] = useState([]); // movies received from the request
  const [filteredMovies, setFilteredMovies] = useState([]); // movies filtered by checkbox and query
  const [isAllMovies, setIsAllMovies] = useState([]); //all movies from the server
  const [isNotFound, setIsNotFound] = useState(false); // state found or not
  const [isFetching, setIsFetching] = useState(true); // data loading
  const [searchError, setSearchError] = useState(""); // error state

   //checking checkbox in local storage
  useEffect(() => {
    if (localStorage.getItem(`${currentUser.email} - checked`) === 'true') {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [currentUser]);
  
    // render movies from local storage
  useEffect(() => {
    if (localStorage.getItem(`${currentUser.email} - movies`)) {
      const movies = JSON.parse(
        localStorage.getItem(`${currentUser.email} - movies`)
      );
      setInitialMovies(movies);
      if (
        localStorage.getItem(`${currentUser.email} - checked`) === 'true'
      ) {
        setFilteredMovies(filterShortMovies(movies));
      } else {
        setFilteredMovies(movies);
      }
    }
  }, [currentUser]);

  // checkbox handler
  function handleShortMovies() {
    setChecked(!checked);
    if (!checked) {
      setFilteredMovies(filterShortMovies(initialMovies));
    } else {
      setFilteredMovies(initialMovies);
    }
    localStorage.setItem(`${currentUser.email} - checked`, !checked);
  }

  // array lookup and state setting
  function handleFilteredMovies(movies, userRequest, shortMoviesCheckbox) {
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
      localStorage.setItem(`${currentUser.email} - movies`, JSON.stringify(moviesList));
    }
  }

  // search by request
  function handleSearchMovies(inputValue) {
    localStorage.setItem(`${currentUser.email} - movieSearch`, inputValue);
    localStorage.setItem(`${currentUser.email} - checked`, checked);

    if (isAllMovies.length === 0) {
      moviesApi.getMovies()
        .then(movies => {
          setIsAllMovies(movies);
          handleFilteredMovies(
            inputValue,
            checked
          );
        })
        .catch(() => {
          setSearchError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
        })
        .finally(() => setIsFetching(false));
    } else {
      handleFilteredMovies(isAllMovies, inputValue, checked);
    }
  }

  return (
    <main className="movies">
      <SearchForm
        handleSearchSubmit={handleSearchMovies}
        handleShortMovies={handleShortMovies}
        checked={checked}
      />
     {/* { isFetching ? (
        <Preloader />
      ) : !isNotFound ? ( */}
        {!isNotFound ? (
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
