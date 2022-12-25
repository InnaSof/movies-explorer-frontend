import { SHORTMOVIE_DURATION } from "./constants";

function filterMovies(movies, userRequest, shortMoviesCheckbox) {
  const moviesByUserRequest = movies.filter((movie) => {
    const movieRu = String(movie.nameRU).toLowerCase().trim();
    const movieEn = String(movie.nameEN).toLowerCase().trim();
    const userMovie = userRequest.toLowerCase().trim();
    return movieRu.indexOf(userMovie) !== -1 || movieEn.indexOf(userMovie) !== -1;
  });

  if (shortMoviesCheckbox) {
    return filterShortMovies(moviesByUserRequest);
  } else {
    return moviesByUserRequest;
  }
}

  // фильтрация по длительности
function filterShortMovies(movies) {
  return movies.filter(movie => movie.duration < SHORTMOVIE_DURATION);
}

export { filterMovies, filterShortMovies };
