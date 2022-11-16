import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <h2 className="footer__title">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </h2>
        <div className="footer__navbar">
          <p className="footer__copyright">&copy; 2022</p>
            <ul className="footer__list">
              <li>
                <a
                  className="footer__link"
                  href="https://practicum.yandex.ru"
                  target="_blank"
                  rel="noreferrer"
                >
                  Яндекс.Практикум
                </a>
              </li>
              <li>
                <a
                  className="footer__link"
                  href="https://github.com/InnaSof"
                  target="_blank"
                  rel="noreferrer"
                >
                  Github
                </a>
              </li>
            </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

