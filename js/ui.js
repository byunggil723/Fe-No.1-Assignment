import { fetchMovies, fetchMovieDetails, IMAGE_BASE } from './api.js';

const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const movieList = document.getElementById('movieList');
const modal = document.getElementById('modal');
const modalDetails = document.getElementById('modalDetails');
const backToList = document.getElementById('backToList');

searchBtn.addEventListener('click', async () => {
  const query = searchInput.value.trim();
  if (query) {
    const movies = await fetchMovies(query);
    console.log(movies);
    displayMovies(movies);
  }
});

searchInput.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter') {
      const query = searchInput.value.trim();
      if (query) {
        const movies = await fetchMovies(query);
        displayMovies(movies);
      }
    }
  });  

backToList.addEventListener('click', () => {
  modal.classList.add('hidden');
});

function displayMovies(movies) {
  movieList.innerHTML = '';
  movies.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.className = 'movie-card';
    movieCard.innerHTML = `
      <img src="${IMAGE_BASE + movie.poster_path}" alt="${movie.title}" />
      <div class="movie-info">
        <h3>${movie.title}</h3>
        <p>⭐ ${movie.vote_average}</p>
        <p>${movie.overview.substring(0, 80)}...</p>
      </div>`
    ;
    movieCard.addEventListener('click', () => showDetails(movie.id));
    movieList.appendChild(movieCard);
  });
}

async function showDetails(movieId) {
  const movie = await fetchMovieDetails(movieId);
  console.log(movie);
  modalDetails.innerHTML = `
    <h2>${movie.title}</h2>
    <img src="${IMAGE_BASE + movie.poster_path}" alt="${movie.title}" style="width: 100%; max-width: 300px;"/>
    <p><strong>개봉일:</strong> ${movie.release_date}</p>
    <p><strong>평점:</strong> ${movie.vote_average}</p>
    <p>${movie.overview}</p>`
  ;
  modal.classList.remove('hidden');
}