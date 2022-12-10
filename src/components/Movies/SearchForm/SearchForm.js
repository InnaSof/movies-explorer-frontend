import React, { useState } from "react";
import "./SearchForm.css";
import { useLocation } from 'react-router-dom';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({ onSearchSubmit, isCheckboxChecked, onCheckboxChange }) {

  const location = useLocation();
  const [inputSearch, setInputSearch] = useState(location.pathname === '/movies' ? localStorage.getItem('inputSearch') || '' : '');
  const [searchError, setSearchError] = useState('');

  function handleInputChange(evt) {
    setInputSearch(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (inputSearch === '') {
      setSearchError('Нужно ввести ключевое слово')
    } else {
      onSearchSubmit(inputSearch);
      setSearchError('');
    }
    location.pathname === '/movies' && localStorage.setItem('inputSearch', inputSearch);
  }

  return (
    <section className="search">
      <div className="search__container">
        <form 
          className="search__form"
          onSubmit={handleSubmit}
          noValidate="" 
        >
          <input 
            className="search__input" 
            type="text" 
            placeholder="Фильм" 
            name="search" 
            required
            value={inputSearch || ''}
            onChange={handleInputChange}
          />
          <span className="search__error">{searchError}</span>
          <button className="search__btn" type="submit"></button>
        </form>
        <FilterCheckbox
          isChecked={isCheckboxChecked}
          onCheckboxChange={onCheckboxChange}
        />
      </div>
    </section>
  );
}

export default SearchForm;
