import React from "react";
import "./SavedMovies.css";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../../components/Movies/MoviesCardList/MoviesCardList";
import { cards } from "../../utils/saved-cards";

function SavedMovies() {
  return (
    <section className="saved-movies">
      <SearchForm />
      <MoviesCardList cards={cards} />
    </section>
  );
}

export default SavedMovies;
