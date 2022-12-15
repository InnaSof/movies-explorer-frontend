import { useState, useEffect } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
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
import Preloader from "../Movies/Preloader/Preloader";

import * as auth from "../../utils/auth";
import mainApi from "../../utils/MainApi";

function App() {
  const history = useHistory();
  const location = useLocation();
  
  const headerEndpoints = ['/', '/movies', '/saved-movies', '/profile'];
  const footerEndpoints = ['/', '/movies', '/saved-movies'];

  const [currentUser, setCurrentUser] = useState({});
  const [requestStatus, setRequestStatus] = useState('');
  const [isLoader, setIsLoader] = useState(false);
  const [savedMoviesList, setSavedMoviesList] = useState([]);

  let state = !!localStorage.getItem('token');
  const [loggedIn, setLoggedIn] = useState(state);

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
      })
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
        setLoggedIn(true);
        setCurrentUser(res);
        setRequestStatus('Данные успешно обновлены!');
      })
      .catch((err) => {
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
    history.push("/");
    setCurrentUser({});
  }

  // cохранение фильма
  function handleSaveMovie(movie) {
    mainApi.addMovie(movie)
      .then((newMovie) => setSavedMoviesList([newMovie, ...savedMoviesList]))
      .catch((err) => {
        console.log(err);
      });
  }

  // удаление фильма
  function handleDeleteMovie(movie) {
    const savedMovie = savedMoviesList.find((item) => item.movieId === movie.id || item.movieId === movie.movieId);
    mainApi.deleteMovie(savedMovie._id)
      .then(() => {
        const newMoviesList = savedMoviesList.filter(m => {
          if (movie.id === m.movieId || movie.movieId === m.movieId) {
            return false;
          } else {
            return true;
          }
        });
        setSavedMoviesList(newMoviesList);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // получение массива сохраненных фильмов
  useEffect(() => {
    if (loggedIn && currentUser) {
      mainApi.getSavedMovies()
        .then(data => {
          const UserMoviesList = data.filter(m => m.owner === currentUser._id);
          setSavedMoviesList(UserMoviesList);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [currentUser, loggedIn]);

      // получение информации о пользователе
  useEffect(() => {
    if (loggedIn) {
      setIsLoader(true);
      mainApi.getUserInfo()
        .then(res => setCurrentUser(res))
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setIsLoader(false));
    }
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Route exact path={headerEndpoints}>
          <Header 
            loggedIn={loggedIn} 
          />
        </Route>

        <Switch>
          <Route exact path='/'>
            <Main />
          </Route>

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

          <ProtectedRoute
            path='/profile'
            component={Profile}
            loggedIn={loggedIn}
            onUpdateUser={handleUpdateUser}
            onSignOut={handleSignOut}
            profileError={requestStatus}
          />

          <ProtectedRoute
            path='/movies'
            component={Movies}
            loggedIn={loggedIn}
            setIsLoader={setIsLoader}
            savedMoviesList={savedMoviesList}
            onLikeClick={handleSaveMovie}
            onDeleteClick={handleDeleteMovie}
            movieError={requestStatus}
          />
            
            <ProtectedRoute
              path='/saved-movies'
              component={SavedMovies}
              loggedIn={loggedIn}
              savedMoviesList={savedMoviesList}
              onDeleteClick={handleDeleteMovie}
            />

          <Preloader isOpen={isLoader} />
          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
        <Route exact path={footerEndpoints}>
          <Footer />
        </Route>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
