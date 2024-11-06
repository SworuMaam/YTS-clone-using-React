import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = 'https://yts.mx/api/v2/';

async function searchMovies(query) {
  try {
    const response = await axios.get(`${BASE_URL}list_movies.json?query_term=${query}`);
    return response.data.data.movies; 
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
}

function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      const movies = await searchMovies(query);
      setFilteredMovies(movies);
    } else {
      setFilteredMovies([]);
    }
  };

  const handleMovieClick = (movieId) => {
    window.location.href = `/movie/${movieId}`; // Redirecting to movie details page main code
  };

  return (
    <header className="bg-gray-900 text-white p-4 flex items-center justify-between">
      <div className="logo">
        <Link to="/">
          <img src="https://yts.mx/assets/images/website/logo-YTS.svg" alt="Logo" className="h-10" />
          </Link>
      </div>

      <nav className="flex space-x-4">
        <div className="search-bar relative">
          <input
            type="text"
            className="search-input p-2 rounded-lg bg-gray-800 text-gray-300"
            id="searchInput"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Quick Search"
            aria-label="Search movies"
          />
          {/* Search ko dropdown */}
          {searchQuery && filteredMovies.length > 0 && (
            <div id="dropdown" className="absolute bg-gray-800 rounded-lg mt-2 w-full max-h-64 overflow-y-auto">
              {filteredMovies.map((movie) => (
                <div
                  key={movie.id}
                  className="dropdown-item p-2 flex items-center cursor-pointer hover:bg-gray-700"
                  onClick={() => handleMovieClick(movie.id)}
                >
                  <img src={movie.medium_cover_image} alt={movie.title} className="w-12 h-12 mr-2" />
                  <span className="text-white">{movie.title}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <ul className="flex space-x-4">
          <li><Link to="/" className="hover:text-green-400">Home</Link></li>
          <li><a href="#4k" className="hover:text-green-400">4K</a></li>
          <li><a href="#Trending" className="hover:text-green-400">Trending</a></li>
          <li><a href="#browse" className="hover:text-green-400">Browse Movies</a></li>
        </ul>

        <ul className="flex space-x-2 text-white">
          <li><a href="#login" className="hover:text-green-400">Login</a></li>
          <li>|</li>
          <li><a href="#register" className="hover:text-green-400">Register</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
