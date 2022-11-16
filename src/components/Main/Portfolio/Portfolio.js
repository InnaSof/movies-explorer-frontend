import React from "react";
import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
      <div className="portfolio__container">
        <h2 className="portfolio__title">Портфолио</h2>
        <ul className="portfolio__list">
          <li className="portfolio__list-item">
            <a href="https://github.com/InnaSof/how-to-learn"
              className="portfolio__link"
              target="_blank"
              rel="noreferrer"
            >
              Статичный сайт
            </a>
          </li>
          <li className="portfolio__list-item">
            <a href="https://github.com/InnaSof/russian-travel"
              className="portfolio__link"
              target="_blank"
              rel="noreferrer"
            >
              Адаптивный сайт
            </a>
          </li>
          <li className="portfolio__list-item">
            <a href="https://github.com/InnaSof/react-mesto-api-full"
              className="portfolio__link"
              rel="noreferrer"
            >
              Одностраничное приложение
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Portfolio;
