document.addEventListener('DOMContentLoaded', function () {
    let movies = JSON.parse(localStorage.getItem('movies')) || [];
    const movieListContainer = document.getElementById('movieList');
  
    function displayMovies() {
      movieListContainer.innerHTML = '';
      movies
        .filter(movie => !movie.deleted)
        .sort((a, b) => b.rating - a.rating)
        .forEach(movie => {
          const movieElement = document.createElement('div');
          movieElement.innerHTML = `<strong>${movie.movieName}</strong> - Rating: ${movie.rating}, Released: ${movie.releaseDate}, Favorited: ${movie.favorited ? 'Yes' : 'No'}
          <button onclick="toggleFavorite(${movie.movieID})">Favorite</button>
          <button onclick="deleteMovie(${movie.movieID})">Delete</button>`;
          movieListContainer.appendChild(movieElement);
        });
    }
  
    function addMovie(movieName, rating, releaseDate) {
      const newMovie = {
        movieID: movies.length + 1,
        movieName,
        rating,
        releaseDate,
        favorited: false,
        deleted: false
      };
  
      movies.push(newMovie);
      localStorage.setItem('movies', JSON.stringify(movies));
      displayMovies();
    }
  
    window.toggleFavorite = function (movieID) {
      const movieIndex = movies.findIndex(movie => movie.movieID === movieID);
      if (movieIndex !== -1) {
        movies[movieIndex].favorited = !movies[movieIndex].favorited;
        localStorage.setItem('movies', JSON.stringify(movies));
        displayMovies();
      }
    };
  
    window.deleteMovie = function (movieID) {
      const movieIndex = movies.findIndex(movie => movie.movieID === movieID);
      if (movieIndex !== -1) {
        movies[movieIndex].deleted = true;
        localStorage.setItem('movies', JSON.stringify(movies));
        displayMovies();
      }
    };
  
    const addMovieForm = document.getElementById('addMovieForm');
    addMovieForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const movieName = document.getElementById('movieName').value;
      const rating = document.getElementById('rating').value;
      const releaseDate = document.getElementById('releaseDate').value;
  
      addMovie(movieName, rating, releaseDate);
      addMovieForm.reset();
    });
  
    displayMovies();
  });
  