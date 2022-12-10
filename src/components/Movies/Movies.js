import React, { useState } from "react";
import "./Movies.css";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";

function Movies({ renderedMovies }) {
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(JSON.parse(localStorage.getItem('checkboxStatus')) || false);

  function handleSearchSubmit() {

  }

  function handleCheckboxChange() {
    setIsCheckboxChecked(!isCheckboxChecked);
  }

  return (
    <main className="movies">
      <SearchForm
        onSubmit={handleSearchSubmit}
        onCheckboxChange={handleCheckboxChange}
        isCheckboxChecked={isCheckboxChecked}
      />
      <MoviesCardList
        movies={renderedMovies}
      />
    </main>
  );
}

export default Movies;
