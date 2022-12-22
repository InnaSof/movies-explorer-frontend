import './SavedMovies.css';
import { useState, useContext, useEffect } from 'react';
import Preloader from "../Movies/Preloader/Preloader";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { filterMovies, filterShortMovies } from "../../utils/filterMovies";

function SavedMovies({ onDeleteClick, savedMoviesList, isFetching }) {
  const currentUser = useContext(CurrentUserContext);

  const [checked, setChecked] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [displayedMovies, setDisplayedMovies] = useState(savedMoviesList);
  const [filteredMovies, setFilteredMovies] = useState(displayedMovies);

  // search by request
  function handleSearchSavedMovies(inputValue) {
    const moviesList = filterMovies(savedMoviesList, inputValue, checked);
    if (moviesList.length === 0) {
      setIsNotFound(true);
    } else {
      setFilteredMovies(moviesList);
      setDisplayedMovies(moviesList);
      setIsNotFound(false);
    }
  }

  // checkbox state
  function handleShortMovies() {
    if (!checked) {
      setChecked(true);
      localStorage.setItem(`${currentUser.email} - shortSavedMovies`, true);
      setDisplayedMovies(filterShortMovies(filteredMovies));
      filterShortMovies(filteredMovies).length === 0 ? setIsNotFound(true) : setIsNotFound(false);
    } else {
      setChecked(false);
      localStorage.setItem(`${currentUser.email} - shortSavedMovies`, false);
      filteredMovies.length === 0 ? setIsNotFound(true) : setIsNotFound(false);
      setDisplayedMovies(filteredMovies);
    }
  }

  // checking checkbox in local storage
  useEffect(() => {
    if (localStorage.getItem(`${currentUser.email} - shortSavedMovies`) === 'true') {
      setChecked(true);
      setDisplayedMovies(filterShortMovies(savedMoviesList));
    } else {
      setChecked(false);
      setDisplayedMovies(savedMoviesList);
    }
  }, [savedMoviesList, currentUser]);

  useEffect(() => {
    setFilteredMovies(savedMoviesList);
    savedMoviesList.length !== 0 ? setIsNotFound(false) : setIsNotFound(true);
  }, [savedMoviesList]);

  return (
    <main className="saved-movies">
      <SearchForm
        handleSearchSubmit={handleSearchSavedMovies}
        handleShortMovies={handleShortMovies}
        checked={checked}
      />
     { isFetching ? (
        <Preloader />
      ) : !isNotFound ? (
      <MoviesCardList
        moviesList={filteredMovies}
        savedMoviesList={savedMoviesList}
        onDeleteClick={onDeleteClick}
      />
      ) : (
        <span className="movies__nothing-found-text">Ничего не найдено</span>
      )
    }
    </main>
  )
}

export default SavedMovies;
