import React from "react";
import './AboutMe.css';
import profilePhoto from "../../../images/photo.jpg";
import Portfolio from "../Portfolio/Portfolio";

function AboutMe() {
  return (
    <section className="about-me" id="student">
      <div className="about-me__container">
        <h2 className="about-me__title">Студент</h2>
        <div className="about-me__student">
          <div className="about-me__text-container">
            <h2 className="about-me__name">Инна</h2>
            <h3 className="about-me__job">Фронтенд-разработчик, 33 года</h3>
            <p className="about-me__description">
              Я живу в Люберцах, закончила факультет инженерии в телекоммуникациях. У меня есть муж и сын. 
              Я люблю путешествовать, а ещё увлекаюсь фотографиями. Недавно начала кодить. С 2016 года работаю в компании «ОЛДИ».
              По окончанию курсов, планирую найти постоянную раюоту в сфере фронтенд-разработки.
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
