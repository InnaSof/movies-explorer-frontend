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

  const [shortMovies, setShortMovies] = useState(false); // состояние чекбокса
  const [initialMovies, setInitialMovies] = useState([]); // фильмы полученные с запроса
  const [filteredMovies, setFilteredMovies] = useState([]); // отфильтрованные по чекбоксу и запросу фильмы
  const [isAllMovies, setIsAllMovies] = useState([]);
  const [isFound, setIsFound] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [searchError, setSearchError] = useState('');

    // проверка чекбокса в локальном хранилище
  useEffect(() => {
    if (localStorage.getItem(`${currentUser.email} - shortMovies`) === 'true') {
      setShortMovies(true);
    } else {
      setShortMovies(false);
    }
  }, [currentUser]);
  
    // рендер фильмов из локального хранилища
  useEffect(() => {
    if (localStorage.getItem(`${currentUser.email} - movies`)) {
      const movies = JSON.parse(
        localStorage.getItem(`${currentUser.email} - movies`)
      );
      setInitialMovies(movies);
      if (
        localStorage.getItem(`${currentUser.email} - shortMovies`) === 'true'
      ) {
        setFilteredMovies(filterShortMovies(movies));
      } else {
        setFilteredMovies(movies);
      }
    }
  }, [currentUser]);

  // состояние чекбокса
  function handleShortMovies() {
    setShortMovies(!shortMovies);
    if (!shortMovies) {
      setFilteredMovies(filterShortMovies(initialMovies));
    } else {
      setFilteredMovies(initialMovies);
    }
    localStorage.setItem(`${currentUser.email} - shortMovies`, !shortMovies);
  }

  function handleFilteredMovies(movies, userRequest, shortMoviesCheckbox) {
    const moviesList = filterMovies(movies, userRequest, shortMoviesCheckbox);
    if (moviesList.length === 0) {
      setIsFound(true);
      setSearchError('Ничего не найдено');
    } else {
      setInitialMovies(moviesList);
      setIsFound(false);
      setFilteredMovies(
        shortMoviesCheckbox ? filterShortMovies(moviesList) : moviesList
      );
      localStorage.setItem(
        `${currentUser.email} - movies`,
        JSON.stringify(moviesList)
      );
    }
  }

  // поиск по запросу
  function handleSearchMovies(inputValue) {
    localStorage.setItem(`${currentUser.email} - movieSearch`, inputValue);
    localStorage.setItem(`${currentUser.email} - shortMovies`, shortMovies);

    if (isAllMovies.length === 0) {
      setIsFetching(true);
      moviesApi.getMovies()
        .then(movies => {
          setIsAllMovies(movies);
          handleFilteredMovies(
            inputValue,
            shortMovies
          );
        })
        .catch(() => {
          setSearchError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
        })
        .finally(() => setIsFetching(false));
    } else {
      handleFilteredMovies(isAllMovies, inputValue, shortMovies);
    }
  }

  return (
    <main className="movies">
      <SearchForm
        handleSearchSubmit={handleSearchMovies}
        handleShortMovies={handleShortMovies}
        shortMovies={shortMovies}
      />
     { isFetching ? (
        <Preloader />
      ) : !isFound ? (
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
