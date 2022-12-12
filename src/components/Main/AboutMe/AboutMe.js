import React from "react";
import './AboutMe.css';
import profilePhoto from "../../../images/photo.png";
import Portfolio from "../Portfolio/Portfolio";

function AboutMe() {
  return (
    <section className="about-me" id="student">
      <div className="about-me__container">
        <h2 className="about-me__title">Студент</h2>
        <div className="about-me__student">
          <div className="about-me__text-container">
            <h2 className="about-me__name">Виталий</h2>
            <h3 className="about-me__job">Фронтенд-разработчик, 30 лет</h3>
            <p className="about-me__description">
              Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. 
              Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». 
              После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
            </p>
            <a className="about-me__link" href="https://github.com/" target="_blank" rel="noreferrer">Github</a>
          </div>
          <img className="about-me__avatar" src={profilePhoto} alt="avatar" />
        </div>
        <Portfolio />
      </div>
    </section>
  );
}

export default AboutMe;
