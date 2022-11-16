import React from "react";
import { Link, NavLink, Route, Switch } from "react-router-dom";
import "./Header.css";
import Navigation from "../Navigation/Navigation";
import logo from "../../images/logo.svg";
import accountIcon from "../../images/account-icon.svg";

function Header() {
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = React.useState(false);

  function openHamburgerMenu() {
      setIsHamburgerMenuOpen(true);
  }

  function closeHamburgerMenu() {
      setIsHamburgerMenuOpen(false);
  }

  return (
    <Switch>
      <Route exact path="/">
        <header className="header">
          <div className="header__container">
            <Link to="/">
              <img className="header__logo" src={logo} alt="Логотип" />
            </Link>
            <nav className="header__menu">
              <Link to="/signup">
                <button className="header__btn-register">Регистрация</button>
              </Link>
              <Link to="/signin">
                <button className="header__btn-login">Войти</button>
              </Link>
            </nav>
          </div>
        </header>
      </Route>

      <Route path={["/movies", "/saved-movies", "/profile"]}>
        <header className="header header_type_main">
          <div className="header__container header__container-main">
            <Link to="/">
              <img className="header__logo" src={logo} alt="Логотип" />
            </Link>
            <nav className="header__links">
              <NavLink to="/movies"
                className="header__link"
                activeClassName="header__link_active">
                  Фильмы
              </NavLink>
              <NavLink to="/saved-movies" 
                className="header__link"
                activeClassName="header__link_active">
                  Сохранённые фильмы
              </NavLink>
            </nav>
            <nav className="header__wrapper">
              <NavLink to="/profile"
                className="header__link-profile">
                  Аккаунт
              </NavLink>
              <NavLink to="/profile">
                <img className="header__account-img" src={accountIcon} alt="изображение человечка" />
              </NavLink>
            </nav>
          </div>

          <div className="header__container header__container-hamburger">
            <Link to="/">
              <img className="header__logo" src={logo} alt="Логотип" />
            </Link>
            <button 
              className="header__btn-hamburger" 
              type="button" 
              onClick={openHamburgerMenu}>
            </button>
          </div>
          <Navigation  
            isOpen={isHamburgerMenuOpen}
            onClose={closeHamburgerMenu}
          />
        </header>
      </Route>
    </Switch>
  );
}

export default Header;
