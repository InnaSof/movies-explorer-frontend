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
import moviesApi from "../../utils/MoviesApi";

function App() {
  const history = useHistory();
  const location = useLocation();
  
  const headerEndpoints = ['/', '/movies', '/saved-movies', '/profile'];
  const footerEndpoints = ['/', '/movies', '/saved-movies'];

  const [currentUser, setCurrentUser] = useState({});
  const [requestStatus, setRequestStatus] = useState('');
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [initialMovies, setInitialMovies] = useState([]);
  const [checkboxStatus, setCheckboxStatus] = useState(false);
  const [renderedMovies, setRenderedMovies] = useState([]);

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

  // cохранить фильм
  function handleSaveMovie(movie) {
    mainApi.addMovie(movie)
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

//удалить фильм
  function handleDeleteMovie(movie) {
    mainApi.deleteMovie(movie._id)
      .then(() => {
        setSavedMovies((movies) =>
          movies.filter((m) => 
            m._id !== movie._id
          )
        )
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // получение информации о пользователе
  useEffect(() => {
    if (loggedIn) {
      mainApi.getUserInfo()
        .then((user) => {
          setCurrentUser(user)
        })
        .catch((err) => {
          console.error(err);
        })
    }
  }, [loggedIn]);

  // получение массива сохраненных фильмов
  useEffect(() => {
    if (loggedIn && currentUser) {
      mainApi.getSavedMovies()
        .then(({movies}) => {
          movies.filter((m) => m.owner === currentUser._id);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [currentUser, loggedIn]);

  //поиск фильмов
  function handleSearchMovie(checkboxStatus) {
    setCheckboxStatus(checkboxStatus);

    const initialMoviesInLocalStorage = JSON.parse(localStorage.getItem('initialMovies'));

    if (!initialMoviesInLocalStorage) {
      setIsLoader(true);
      moviesApi.getInitialMovies()
        .then((movies) => {
          setInitialMovies(movies);
          localStorage.setItem('initialMovies', JSON.stringify(movies));
        })
        .catch(() => {
          requestStatus('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.')
        })
        .finally(() => {
          setIsLoader(false);
        })
    } else {
      setInitialMovies(initialMoviesInLocalStorage);
    }
  }

  // const getMovies = (filterCallback) => {
  //   setIsDataLoading(true);
  //   return moviesApi.getMovies()
  //     .then((res) => {
  //       setMovies(res);
  //       filterCallback(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setIsInfoTooltipOpen(true);
  //     })
  //     .finally(() => {
  //       setIsDataLoading(false)
  //     })
  // }

      
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
            savedMovies={savedMovies}
            onSaveMovie={handleSaveMovie}
            onDeleteMovie={handleDeleteMovie}
            searchError={requestStatus}
            setIsLoader={setIsLoader}
            onSearch={handleSearchMovie}
            renderedMovies={renderedMovies}
          />
          <ProtectedRoute
            path='/saved-movies'
            component={SavedMovies}
            loggedIn={loggedIn}
            savedMovies={savedMovies}
            onDeleteMovie={handleDeleteMovie}
            searchError={requestStatus}
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
