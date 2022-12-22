import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox({ checked, handleShortMovies }) {

  function handleChange() {
    handleShortMovies();
  }

  return (
    <div className="filter">
      <div className="filter__container">
        <input 
          className="filter__checkbox" 
          type="checkbox"
          onChange={handleChange}
          checked={checked ? true : false}
        />
        <p className='filter__title'>Короткометражки</p>
      </div>
    </div>
  );
}

export default FilterCheckbox;
