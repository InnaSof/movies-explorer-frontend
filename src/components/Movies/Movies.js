import React, { useState, useContext, useEffect } from "react";
import "./Movies.css";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import moviesApi from "../../utils/MoviesApi";
import Preloader from "../Movies/Preloader/Preloader";

function Movies({ savedMoviesList, onLikeClick, onDeleteClick, setIsFetching, isFetching }) {
  const currentUser = useContext(CurrentUserContext);

  const [shortMovies, setShortMovies] = useState(false); // состояние чекбокса
  const [initialMovies, setInitialMovies] = useState([]); // фильмы полученные с запроса
  const [filteredMovies, setFilteredMovies] = useState([]); // отфильтрованные по чекбоксу и запросу фильмы
  const [isAllMovies, setIsAllMovies] = useState([]);
  const [isFound, setIsFound] = useState(false);

  const [requestStatus, setRequestStatus] = useState('');

  function filterMovies(movies, userRequest, shortMoviesCheckbox) {
    const moviesByUserRequest = movies.filter((movie) => {
      const movieRu = String(movie.nameRU).toLowerCase().trim();
      const movieEn = String(movie.nameEN).toLowerCase().trim();
      const userMovie = userRequest.toLowerCase().trim();
      return movieRu.indexOf(userMovie) !== -1 || movieEn.indexOf(userMovie) !== -1;
    });
  
    if (shortMoviesCheckbox) {
      return filterShortMovies(moviesByUserRequest);
    } else {
      return moviesByUserRequest;
    }
  }

    // фильтрация по длительности
  function filterShortMovies(movies) {
    return movies.filter(movie => movie.duration < 40);
  }

  
  function handleFilteredMovies(movies, userRequest, shortMoviesCheckbox) {
    const moviesList = filterMovies(movies, userRequest, shortMoviesCheckbox);
    if (moviesList.length === 0) {
      setIsFound(false);
    } else {
      setInitialMovies(moviesList);
      setIsFound(true);
      setFilteredMovies(
        shortMoviesCheckbox ? filterShortMovies(moviesList) : moviesList
      );
      localStorage.setItem(
        `${currentUser.email} - movies`,
        JSON.stringify(moviesList)
      );
    }
  }

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

  // поиск по запросу
  function handleSearchMovies(inputValue) {
    localStorage.setItem(`${currentUser.email} - movieSearch`, inputValue);
    localStorage.setItem(`${currentUser.email} - shortMovies`, shortMovies);

    if (isAllMovies.length === 0) {
      moviesApi.getInitialMovies()
        .then(movies => {
          setIsAllMovies(movies);
          setIsFetching(false);
          handleFilteredMovies(
            inputValue,
            shortMovies
          );
        })
        .catch(() => {
          setRequestStatus('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.')})
    } else {
      handleFilteredMovies(isAllMovies, inputValue, shortMovies);
    }
  }

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

  return (
    <main className="movies">
      <SearchForm
        handleSearchSubmit={handleSearchMovies}
        handleShortMovies={handleShortMovies}
        shortMovies={shortMovies}
      />
     { isFetching ? (
        <Preloader />
      ) : isFound ? (
        <MoviesCardList
          moviesList={filteredMovies}
          savedMoviesList={savedMoviesList}
          onLikeClick={onLikeClick}
          onDeleteClick={onDeleteClick}
          isFetching={isFetching}
        />
        ) : (
          <p className="movies__nothing-found-text">Ничего не найдено</p>
        )
      }
    </main>
  );
}

export default Movies;
