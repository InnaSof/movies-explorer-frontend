import React from "react";
import { useState } from "react";
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
  const [inputSearch, setInputSearch] = useState('');
  const [checkboxStatus, setCheckboxStatus] = useState(false);

  function handleInputChange(evt) {
    setInputSearch(evt.target.value);
  }

  function handleCheckboxChange(evt) {
    toggleCheckboxChange(evt.target.checked);
  }

  function toggleCheckboxChange(checkboxStatus) {
    setCheckboxStatus(checkboxStatus);
  }

  return (
    <section className="search">
      <div className="search__container">
        <form className="search__form">
          <input 
            className="search__input" 
            type="text" 
            placeholder="Фильм" 
            name="search" 
            required=""
            value={inputSearch || ''}
            onChange={handleInputChange}
          />
          <button className="search__btn" type="submit"></button>
        </form>
        <FilterCheckbox
          checkboxStatus={checkboxStatus}
          onChangeCheckbox={handleCheckboxChange}
        />
      </div>
    </section>
  );
}

export default SearchForm;
