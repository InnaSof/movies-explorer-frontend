import React from "react";
import "./Movies.css";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Preloader from "../Movies/Preloader/Preloader";

function Movies({ onSearch, loading, searchStatus }) {
  return (
    <main className="movies">
      <SearchForm 
        onSearch={onSearch}
      />
      {loading ? <Preloader /> : ''}
      <MoviesCardList
        loading={loading}
      />
      {!loading ?
        <div className="movies__container">
          <span className="movies__text">Ничего не найдено</span>
        </div>
        :
        <div className="movies__container">
          <span className="movies__text">{searchStatus}</span>
        </div>
      }   
    </main>
  );
}

export default Movies;
