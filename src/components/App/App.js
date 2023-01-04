import { useState, useEffect } from 'react';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
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

function App() {
  const history = useHistory();
  
  const headerEndpoints = ['/', '/movies', '/saved-movies', '/profile'];
  const footerEndpoints = ['/', '/movies', '/saved-movies'];

  const [currentUser, setCurrentUser] = useState({});
  const [requestStatus, setRequestStatus] = useState('');
  const [savedMoviesList, setSavedMoviesList] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    tokenCheck()
  }, [loggedIn]);

  function tokenCheck() {
    const token = localStorage.getItem("token");
    if (token) {
      auth.checkToken(token)
        .then((res) => {
          setCurrentUser(res);
          setLoggedIn(true);
        })
        .catch((err) => {
          if (err === 401) {
            handleSignOut();
          } else {
          setRequestStatus('Что-то пошло не так! Попробуйте ещё раз.');
          }
        })
    }
  }

  function handleSignOut() {
    localStorage.clear();
    setLoggedIn(false);
    history.push("/");
  }

  // получение массива сохраненных фильмов
  useEffect(() => {
    if (loggedIn && currentUser) {
      mainApi.getSavedMovies()
        .then(data => {
          const UserMoviesList = data.movies.filter(m => m.owner === currentUser._id);
          setSavedMoviesList(UserMoviesList);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [currentUser, loggedIn]);

  function handleRegister({ name, email, password }) {
    auth.register(name, email, password)
      .then(() => {
        setLoggedIn(true);
        handleLogin({ email, password })
        history.push('/movies');
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

  // cохранение фильма
  function handleSaveMovie(movie) {
    mainApi.addMovie(movie)
      .then((res) => {
        const updatedSavedMovies = [...savedMoviesList, { ...res, id: res.movieId }];
        setSavedMoviesList(updatedSavedMovies);
        localStorage.setItem("savedMovies", JSON.stringify(updatedSavedMovies));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // удаление фильма
  function handleDeleteMovie(movie) {
    const savedMovie = savedMoviesList.find(
      (item) => item.movieId === movie.id || item.movieId === movie.movieId
    );
    mainApi.deleteMovie(savedMovie._id)
      .then(() => {
        const updatedSavedMovies = savedMoviesList.filter(m => {
          if (movie.id === m.movieId || movie.movieId === m.movieId) {
            return false;
          } else {
            return true;
          }
        });
        setSavedMoviesList(updatedSavedMovies);
        localStorage.setItem("savedMovies", JSON.stringify(updatedSavedMovies));
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
            {loggedIn ? (
              <Register 
                onRegister={handleRegister}
                registerError={requestStatus}
              />
            ) : (
              <Redirect to='/' />
            )}
          </Route>
                    
          <Route path='/signin'>
            {loggedIn ? (
              <Login 
                onLogin={handleLogin}
                loginError={requestStatus}
              />
            ) : (
              <Redirect to='/' />
            )}
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
            onLikeClick={handleSaveMovie}
            onDeleteClick={handleDeleteMovie}
            savedMoviesList={savedMoviesList}
          />
            
          <ProtectedRoute
            path='/saved-movies'
            component={SavedMovies}
            loggedIn={loggedIn}
            currentUser={currentUser}
            onDeleteClick={handleDeleteMovie}
            savedMoviesList={savedMoviesList}
          />

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
