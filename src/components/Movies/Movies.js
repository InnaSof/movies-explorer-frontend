import React from "react";
import "./Movies.css";
import { cards } from "../../utils/cards";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";

function Movies() {
  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList cards={cards} />
    </main>
  );
}

export default Movies;
