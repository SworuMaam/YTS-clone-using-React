import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchMovies } from '../api';
import { Link } from 'react-router-dom';
import telegramIcon from './media/telegram.svg';
import twitterIcon from './media/twitter.svg';

const BASE_URL = 'https://yts.mx/api/v2/';

function Home() {
  const { data: popularMovies = [] } = useQuery({
    queryKey: ['popularMovies'],
    queryFn: () => fetchMovies(`${BASE_URL}list_movies.json?sort_by=downloads&order_by=desc`),
  });

  const { data: latestMovies = [] } = useQuery({
    queryKey: ['latestMovies'],
    queryFn: () => fetchMovies(`${BASE_URL}list_movies.json?sort_by=year&order_by=desc`),
  });

  const { data: upcomingMovies = [] } = useQuery({
    queryKey: ['upcomingMovies'],
    queryFn: () => fetchMovies(`${BASE_URL}list_movies.json?sort_by=year&order_by=asc`),
  });

  return (
    <div className="space-y-8 px-4 md:px-8 lg:px-16">
      <div className="text-center">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-100 mb-4">
          Download YTS YIFY movies: HD smallest size
        </h1>
        <p className="text-sm md:text-lg text-gray-400 mb-8">
          Welcome to the official YTS.MX website. Here you can browse and download YIFY movies in excellent
          <br className="hidden md:block" />
          720p, 1080p, 2160p 4K and 3D quality, all at the smallest file size. YTS Movies Torrents.
          <br className="hidden md:block" />
          <a href="#important" className="text-blue-400 hover:underline">
            IMPORTANT - YTS.MX is the only new official domain for YIFY Movies
          </a>
          <br />
          <div className="flex items-center justify-center space-x-2 mt-4">
            <img src={telegramIcon} width="16" height="16" alt="Telegram" />
            <a href="#telegram" className="text-blue-400 hover:underline"> YTSMX_UPDATES </a>
            <span className="text-white">|</span>
            <img src={twitterIcon} width="16" height="16" alt="Twitter" />
            <a href="#twitter" className="text-blue-400 hover:underline"> Follow @YTSYIFY for upcoming featured movies!</a>
          </div>
        </p>
      </div>

      <h2 className="text-xl md:text-2xl font-bold text-gray-100 mb-2">Popular Movies</h2>
      <MovieList movies={popularMovies} />

      <h2 className="text-xl md:text-2xl font-bold text-gray-100 mb-2">Latest Movies</h2>
      <MovieList movies={latestMovies} />

      <h2 className="text-xl md:text-2xl font-bold text-gray-100 mb-2">Upcoming Movies</h2>
      <MovieList movies={upcomingMovies} />
    </div>
  );
}

const MovieList = ({ movies }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
    {movies.map(movie => (
      <div
        key={movie.id}
        className="bg-gray-800 rounded-lg overflow-hidden group relative border-2 border-white transition-all duration-300 hover:border-green-500"
      >
        <Link to={`/movie/${movie.id}`} className="block">
          <div className="aspect-w-2 aspect-h-3">
            <img
              src={movie.medium_cover_image}
              alt={movie.title}
              className="w-full h-full object-cover rounded-md transition-all group-hover:opacity-70"
            />
          </div>
        </Link>

        <div className="absolute inset-0 bg-black bg-opacity-50 p-4 opacity-0 group-hover:opacity-100 transition-opacity flex justify-center items-center">
          <div className="text-center">
            <p className="text-white text-xs md:text-sm">Rating: {movie.rating}</p>
            <p className="text-white text-xs md:text-sm">Genre: {movie.genres.join(', ')}</p>
            <Link to={`/movie/${movie.id}`}>
              <button className="bg-green-500 text-white py-1 px-3 md:py-2 md:px-4 rounded hover:bg-green-600 transition-colors mt-2 md:mt-4">
                View Details
              </button>
            </Link>
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-sm md:text-lg font-semibold text-white">{movie.title}</h3>
          <p className="text-xs md:text-sm text-gray-400">{movie.year}</p>
        </div>
      </div>
    ))}
  </div>
);

export default Home;
