import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig'; 
import { signOut } from 'firebase/auth'; 
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
  const [user, setUser] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser); 
      } else {
        setUser(null); 
      }
    });

    return () => unsubscribe(); 
  }, []);

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
    window.location.href = `/movie/${movieId}`; 
  };

  const handleLogout = async () => {
    try {
      await signOut(auth); 
      navigate('/'); 
    } catch (error) {
      console.error('Logout failed:', error.message); 
    }
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
          {user ? (
            <>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <li><Link to="/login" className="hover:text-green-400">Login</Link></li>
              <li>|</li>
              <li><Link to="/register" className="hover:text-green-400">Register</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
