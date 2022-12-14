import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

function App() {
  return (
    <div className="app">
      <Header />
      <Switch>
        <Route exact path="/">
          <Main />
          <Footer />
        </Route>
        <Route path="/movies">
          <Movies />
          <Footer />
        </Route>
        <Route path="/saved-movies">
          <SavedMovies />
          <Footer />
        </Route>
        <Route path="/signin">
          <Login />
        </Route>
        <Route path="/signup">
          <Register />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="">
          <NotFoundPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
