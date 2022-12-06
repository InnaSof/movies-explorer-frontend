import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import useFormWithValidation from "../../../utils/useFormWithValidation";

function SearchForm({ onSearch }) {
  const location = useLocation();

  const { values, handleChange, isValid } = useFormWithValidation();

  const [errorSearch, setErrorSearch] = useState('');
  const [checkboxStatus, setCheckboxStatus] = React.useState(false);
  const [search, setSearch] = useState('');


  function handleSubmit(e) {
    e.preventDefault();
    if (isValid) {
      onSearch([values.search, e.target.checked]);
    } else {
      setErrorSearch('Нужно ввести ключевое слово');
    }
}

  useEffect(() => {
    setErrorSearch('')
  }, [isValid]);

  useEffect(() => {
    if (location.pathname === '/movies') {
      const checkbox = localStorage.getItem('checkboxStatus');
      const search = localStorage.getItem('search');
      if (search) {
        setSearch(search);
      }
      if (JSON.parse(checkbox) === true) {
        setCheckboxStatus(true);
      } else {
        setCheckboxStatus(false);
      }
    }
}, [location.pathname]);

  function handleCheckboxChange(evt) {
    toggleCheckboxChange(evt.target.checked);
  }

  function toggleCheckboxChange(checkboxStatus) {
    setCheckboxStatus(checkboxStatus);
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
            value={values.search || ''}
            onChange={handleChange}
          />
          <span className="search__error">{errorSearch}</span>
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
