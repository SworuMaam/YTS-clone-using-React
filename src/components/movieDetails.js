import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = 'https://yts.mx/api/v2/';

const fetchMovieDetails = async (id) => {
  const response = await axios.get(`${BASE_URL}movie_details.json?movie_id=${id}`);
  return response.data.data.movie;
};

const generateRandomPrice = (min = 100, max = 500) => {
  return (Math.random() * (max - min) + min).toFixed(2);
};

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [price, setPrice] = useState(null);

  const { data: movie, isLoading, error } = useQuery({
    queryKey: ['movieDetails', id],
    queryFn: () => fetchMovieDetails(id),
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (movie) {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const movieInCart = cart.find(item => item.id === movie.id);

      if (movieInCart && movieInCart.price) {
        setPrice(movieInCart.price);
      } else {
        setPrice(generateRandomPrice());
      }
    }
  }, [movie]);

  const handleAddToCart = () => {
    if (!movie) return;

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const movieExists = cart.some(item => item.id === movie.id);

    if (movieExists) {
      alert('Movie is already in cart');
    } else {
      const randomPrice = price || generateRandomPrice();

      cart.push({
        id: movie.id,
        title: movie.title,
        price: randomPrice,
        poster: movie.medium_cover_image,
      });
      localStorage.setItem('cart', JSON.stringify(cart));

      navigate('/checkout');
    }
  };

  if (isLoading) return <p className="text-center text-gray-100">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error fetching movie details</p>;

  return (
    movie ? (
      <div className="container mx-auto p-4 md:p-6 max-w-3xl bg-gray-900 text-white">
        <div className="flex flex-col md:flex-row md:space-x-8 items-center md:items-start">
          <div className="flex-shrink-0 mb-4 md:mb-0 md:w-48">
            {movie.medium_cover_image ? (
              <img 
                src={movie.medium_cover_image} 
                alt={movie.title} 
                className="rounded-lg w-full md:w-48 h-auto object-cover"
              />
            ) : (
              <p className="text-center text-gray-400">Image not available</p>
            )}
          </div>

          <div className="flex flex-col space-y-4 w-full">
            <h1 className="text-2xl font-bold text-gray-100 text-center md:text-left">{movie.title || "Title Not Available"}</h1>
            <p className="text-gray-300">{movie.description_full || "Description not available."}</p>
            <p className="text-gray-300"><strong>Rating:</strong> {movie.rating || "N/A"}</p>
            <p className="text-gray-300"><strong>Genres:</strong> {movie.genres?.join(", ") || "N/A"}</p>
            <p className="text-gray-300"><strong>Price:</strong> Rs {price}</p>

            <button 
              className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 self-center md:self-start" 
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    ) : (
      <p className="text-center text-gray-100">Movie details not found.</p>
    )
  );
}

export default MovieDetails;
