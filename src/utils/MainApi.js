function _getHeaders(){
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
}

class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }
  
  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: _getHeaders(),
    })
    .then(this._handleResponse);
  }

  editUserInfo(name, email) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: _getHeaders(),
      body: JSON.stringify({
        name, email
      })
    })
    .then(this._handleResponse);
  }

  getSavedMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'GET',
      headers: _getHeaders(),
    })
    .then(this._handleResponse);
  }

  addMovie(movie) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: _getHeaders(),
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `https://api.nomoreparties.co${movie.image.url}`,
        trailerLink: movie.trailerLink,
        thumbnail: `https://api.nomoreparties.co${movie.image.url}`,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      }),
    })
    .then(this._handleResponse);
  }

  deleteMovie(movieId) {
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
      method: 'DELETE',
      headers: _getHeaders(),
    })
    .then(this._handleResponse);
  }
}

  // const mainApi = new MainApi({
  //   baseUrl: 'http://localhost:3000'
  // });

  const mainApi = new MainApi({
    baseUrl: 'https://api.movies.diplom.nomorepartiesxyz.ru'
  });

export default mainApi;
