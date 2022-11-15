import React from "react";
import './AboutProject.css';

function AboutProject() {
  return (
    <section className="about-project">
      <div className="about-project__container">
        <h2 className="about-project__title">О проекте</h2>
        <ul className="about-project__list">
          <li className="about-project__list-item">
            <h3 className="about-project__list-title">Дипломный проект включал 5 этапов</h3>
            <p className="about-project__list-subtitle">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          </li>
          <li className="about-project__list-item">
            <h3 className="about-project__list-title">На выполнение диплома ушло 5 недель</h3>
            <p className="about-project__list-subtitle">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </li>
        </ul>
        <div className="about-project__duration">
          <div className="about-project__backend">
            <p className="about-project__backend-title">1 неделя</p>
            <p className="about-project__subtitle">Back-end</p>
          </div>
          <div className="about-project__frontend">
            <p className="about-project__frontend-title">4 недели</p>
            <p className="about-project__subtitle">Front-end</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
