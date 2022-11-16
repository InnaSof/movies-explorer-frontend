import React from "react";
import { Link } from "react-router-dom";
import './NotFoundPage.css';

function NotFoundPage() {

  return (
    <section className="not-found">
      <div className="not-found__container">
        <h2 className="not-found__error">404</h2>
        <span className="not-found__error-text">Страница не найдена</span>
        <Link to="/">
          <button className="not-found__btn">Назад</button>
        </Link>
      </div>
    </section>
  );
}

export default NotFoundPage;
