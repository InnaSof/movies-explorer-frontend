import { useState, useEffect } from 'react';
import { Route, Switch, useHistory, Redirect, useLocation } from 'react-router-dom';
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
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import * as auth from "../../utils/auth";
import mainApi from "../../utils/MainApi";
import moviesApi from "../../utils/MoviesApi";

function App() {

  const [currentUser, setCurrentUser] = useState({});
  const [requestStatus, setRequestStatus] = useState('');

  let state = !!localStorage.getItem('token');
  const [loggedIn, setLoggedIn] = useState(state);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      auth.checkToken(token)
        .then((res) => {
          setLoggedIn(true);
          setCurrentUser(res);
          history.push(location.pathname);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },[history, location.pathname, loggedIn]);

  function handleRegister({ name, email, password }) {
    auth.register(name, email, password)
      .then(() => {
        setLoggedIn(true);
        history.push('/movies');
        handleLogin({ email, password })
      })
      .catch((err) => {
        if (err === 409) {
          return setRequestStatus('Пользователь с таким email уже существует');
        }
        if (err === 500) {
          return setRequestStatus('Ошибка сервера');
        }
        else {
          setRequestStatus('Что-то пошло не так! Попробуйте ещё раз.');
        }
      });
  }

  function handleLogin({ email, password }) {
    auth.login(email, password)
      .then((res) => {
        localStorage.setItem('token', res.token);
        setLoggedIn(true);
        history.push('/movies');
      })
      .catch((err) => {
        if (err === 401) {
          return setRequestStatus('Неправильный email или пароль');
        }
        if (err === 500) {
          return setRequestStatus('Ошибка сервера');
        }
        else {
          setRequestStatus('Что-то пошло не так! Попробуйте ещё раз.');
        }
      })
  }

  function handleUpdateUser({ name, email }) {
    mainApi.editUserInfo(name, email)
      .then((res) => {
        setCurrentUser(res);
        setRequestStatus('Данные успешно обновлены!');
      })
      .catch((err) => {
        if (err === 401) {
          return setRequestStatus('Неправильный email или пароль');
        }
        if (err === 409) {
          return setRequestStatus('Пользователь с таким email уже существует');
        }
        else {
          setRequestStatus('Что-то пошло не так! Попробуйте ещё раз.');
        }
      })
  }

  function handleSignOut() {
    localStorage.removeItem('token');
    setLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">

        <Route path='/signup'>
          <Register 
            onRegister={handleRegister}
            registerError={requestStatus}
          />
        </Route>

        <Route path='/signin'>
          <Login 
            onLogin={handleLogin}
            loginError={requestStatus}
          />
        </Route> 



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

          {/* <ProtectedRoute 
            path="/saved-movies"
            component={SavedMovies}
            >
            <Footer />
          </ProtectedRoute>
    */}
          <Route path='/profile'>
            <Profile
            loggedIn={loggedIn}
            onUpdateUser={handleUpdateUser}
            onSignOut={handleSignOut}
            />
          </Route>

          {/* <Route path="">
            <NotFoundPage />
          </Route> */}
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
