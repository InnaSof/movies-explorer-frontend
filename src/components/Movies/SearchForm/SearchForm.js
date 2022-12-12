import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({ handleSearchSubmit, handleShortMovies, shortMovies }) {
  const { pathname } = useLocation();

  const [searchError, setSearchError] = useState('');
  const [searchMessage, setSearchMessage] = useState(pathname === '/movies' ? localStorage.getItem('searchMessage') || '' : '');

  function handleChange(evt) {
    setSearchError('');
    setSearchMessage(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (searchMessage === '') {
      setSearchError('Нужно ввести ключевое слово')
    } else {
      handleSearchSubmit(searchMessage);
      setSearchError('');
    }
    pathname === '/movies' && localStorage.setItem('searchMessage', searchMessage);
  }

  return (
    <section className="search">
      <div className="search__container">
        <form 
          className="search__form"
          name="search"
          onSubmit={handleSubmit}
          noValidate="" 
        >
          <input 
            className="search__input" 
            type="text" 
            placeholder="Фильм" 
            name="search" 
            required
            value={searchMessage || ''}
            onChange={handleChange}
          />
          <span className="search__error">{searchError}</span>
          <button className="search__btn" type="submit"></button>
        </form>
        <FilterCheckbox
          shortMovies={shortMovies}
          handleShortMovies={handleShortMovies}
        />
      </div>
    </section>
  );
}

export default SearchForm;
