import './SavedMovies.css';
import { useState, useContext, useEffect } from 'react';
import Preloader from "../Movies/Preloader/Preloader";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { filterMovies, filterShortMovies } from "../../utils/filterMovies";

function SavedMovies({ onDeleteClick, savedMoviesList, isFetching }) {
  const currentUser = useContext(CurrentUserContext);
  const [shortMovies, setShortMovies] = useState(false); // состояние чекбокса
  const [isFound, setIsFound] = useState(false);
  const [showedMovies, setShowedMovies] = useState(savedMoviesList); // показываемывые фильмы
  const [filteredMovies, setFilteredMovies] = useState(showedMovies); // отфильтрованные по запросу фильмы

  // поиск по запросу
  function handleSearchSavedMovies(inputValue) {
    const moviesList = filterMovies(savedMoviesList, inputValue, shortMovies);
    if (moviesList.length === 0) {
      setIsFound(true);
    } else {
      setIsFound(false);
      setFilteredMovies(moviesList);
      setShowedMovies(moviesList);
    }
  }

  // состояние чекбокса
  function handleShortMovies() {
    if (!shortMovies) {
      setShortMovies(true);
      localStorage.setItem(`${currentUser.email} - shortSavedMovies`, true);
      setShowedMovies(filterShortMovies(filteredMovies));
      filterShortMovies(filteredMovies).length === 0 ? setIsFound(true) : setIsFound(false);
    } else {
      setShortMovies(false);
      localStorage.setItem(`${currentUser.email} - shortSavedMovies`, false);
      filteredMovies.length === 0 ? setIsFound(true) : setIsFound(false);
      setShowedMovies(filteredMovies);
    }
  }

  // проверка чекбокса в локальном хранилище
  useEffect(() => {
    if (localStorage.getItem(`${currentUser.email} - shortSavedMovies`) === 'true') {
      setShortMovies(true);
      setShowedMovies(filterShortMovies(savedMoviesList));
    } else {
      setShortMovies(false);
      setShowedMovies(savedMoviesList);
    }
  }, [savedMoviesList, currentUser]);

  useEffect(() => {
    setFilteredMovies(savedMoviesList);
    savedMoviesList.length !== 0 ? setIsFound(false) : setIsFound(true);
  }, [savedMoviesList]);

  return (
    <main className="saved-movies">
      <SearchForm
        handleSearchSubmit={handleSearchSavedMovies}
        handleShortMovies={handleShortMovies}
        shortMovies={shortMovies}
      />
     { isFetching ? (
        <Preloader />
      ) : !isFound ? (
      <MoviesCardList
        moviesList={filteredMovies}
        savedMoviesList={savedMoviesList}
        onDeleteClick={onDeleteClick}
      />
      ) : (
        <p className="movies__nothing-found-text">Ничего не найдено</p>
      )
    }
    </main>
  )
}

export default SavedMovies;
