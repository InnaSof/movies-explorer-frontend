import './SavedMovies.css';
import { useState, useContext, useEffect } from 'react';
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { filterMovies, filterShortMovies } from "../../utils/filterMovies";

function SavedMovies({ onDeleteClick, savedMoviesList }) {
  const currentUser = useContext(CurrentUserContext);

  const [checked, setChecked] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [displayedMovies, setDisplayedMovies] = useState(savedMoviesList);
  const [filteredMovies, setFilteredMovies] = useState(displayedMovies);

  // checkbox handler
  function handleShortMovies() {
    if (!checked) {
      setChecked(true);
      localStorage.setItem('shortSavedMovies', true);
      filterShortMovies(filteredMovies).length === 0 ? setIsNotFound(true) : setIsNotFound(false);
      setFilteredMovies(filterShortMovies(savedMoviesList));
      setDisplayedMovies(filterShortMovies(savedMoviesList));
    } else {
      setChecked(false);
      localStorage.setItem('shortSavedMovies', false);
      savedMoviesList.length === 0 ? setIsNotFound(true) : setIsNotFound(false);
      setDisplayedMovies(savedMoviesList);
      setFilteredMovies(savedMoviesList);
    }
  }

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

  // checking checkbox in local storage
  useEffect(() => {
    if (localStorage.getItem('shortSavedMovies') === 'true') {
      setChecked(true);
      setFilteredMovies(filterShortMovies(savedMoviesList));
      setDisplayedMovies(filterShortMovies(savedMoviesList));
      filterShortMovies(savedMoviesList).length === 0 ? setIsNotFound(true) : setIsNotFound(false);
    } else {
      setChecked(false);
      setDisplayedMovies(savedMoviesList);
      setFilteredMovies(savedMoviesList);
      savedMoviesList.length === 0 ? setIsNotFound(true) : setIsNotFound(false);
    }
  }, [savedMoviesList, currentUser]);


  return (
    <main className="saved-movies">
      <SearchForm
        handleSearchSubmit={handleSearchSavedMovies}
        handleShortMovies={handleShortMovies}
        checked={checked}
      />
     { !isNotFound ? (
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
