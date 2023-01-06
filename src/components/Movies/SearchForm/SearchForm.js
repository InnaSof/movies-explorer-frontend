import React, { useState } from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({ handleSearchSubmit, handleShortMovies, checked }) {

  const [searchError, setSearchError] = useState('');
  const [searchText, setSearchText] = useState(
    localStorage.getItem('searchText') ?? ''
  );

  function handleChange(evt) {
    setSearchError('');
    setSearchText(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (searchText === '') {
      setSearchError('Нужно ввести ключевое слово')
    } else {
      handleSearchSubmit(searchText);
      setSearchError('');
    }
  }

  return (
    <section className="search">
      <div className="search__container">
        <form 
          className="search__form"
          name="search"
          onSubmit={handleSubmit}
          noValidate
        >
          <input 
            className="search__input" 
            type="text" 
            placeholder="Фильм" 
            name="search" 
            required
            value={searchText || ''}
            onChange={handleChange}
          />
          <span className="search__error">{searchError}</span>
          <button className="search__btn" type="submit"></button>
        </form>
        <FilterCheckbox
          checked={checked}
          handleShortMovies={handleShortMovies}
        />
      </div>
    </section>
  );
}

export default SearchForm;
