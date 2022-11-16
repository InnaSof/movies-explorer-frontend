import React from "react";
import { Route } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

function MoviesCardList({ cards }) {
  return (
    <section className="cards__movies">
      <ul className="cards__list">
        {cards.map((card) => (
          <MoviesCard
            card={card}
            key={card.id || card._id}
          />
        ))}
      </ul>
      <div className="card__more">
        <Route exact path="/movies">
          <button 
            className="cards__more-button" 
            type="button">
              Ещё
          </button>
        </Route>
      </div>
    </section>
  );
}

export default MoviesCardList;
