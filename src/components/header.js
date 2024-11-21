import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from '../firebaseConfig';
import axios from 'axios';
import { setCart } from '../features/cartSlice';
import cartIcon from './media/cart.png';

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
  const dispatch = useDispatch(); 
  const cart = useSelector((state) => state.cart.items);
  const cartCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        dispatch(setCart(savedCart));
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

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

  return (
    <header className="bg-gray-900 text-white p-4 flex items-center justify-between">
      <div className="logo">
        <Link to="/">
          <img src="https://yts.mx/assets/images/website/logo-YTS.svg" alt="Logo" className="h-10" />
        </Link>
      </div>

      <nav className="flex items-center space-x-4 w-full justify-end">
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

        <ul className="flex items-center space-x-4">
          {user ? (
            <li className="flex items-center space-x-4">
              <Link to="/dashboard" className="hover:text-green-400 text-white">
                Dashboard
              </Link> &nbsp;

              <Link to="/checkout" className="relative">
                <img src={cartIcon} alt="Cart" className="h-8 w-8" />
                {cartCount > 0 && (
                  <span className="absolute -top-4 left-3/2 transform -translate-x-1/2 bg-red-500 text-white text-xs rounded-full px-2 py-1 flex items-center justify-center w-5 h-5 text-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>
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
