import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox({ checkboxStatus, onCheckboxChange }) {
  return (
    <div className="filter">
      <div className="filter__container">
        <input 
          className="filter__checkbox" 
          type="checkbox"
          name="checkbox"
          value={checkboxStatus}
          onChange={onCheckboxChange} 
        />
        <p className='filter__title'>Короткометражки</p>
      </div>
    </div>
  );
}

export default FilterCheckbox;
