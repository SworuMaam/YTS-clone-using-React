import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = 'https://yts.mx/api/v2/';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const response = await axios.get(`${BASE_URL}movie_details.json?movie_id=${id}`);
        setMovie(response.data.data.movie);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    }
    fetchMovie();
  }, [id]);

  return (
    movie ? (
      <div className="container mx-auto p-6 max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-100 mb-4">{movie.title}</h1>
        <img src={movie.medium_cover_image} alt={movie.title} className="rounded-lg mb-4" />
        <p className="text-gray-300 mb-4">{movie.description_full}</p>
        <p className="text-gray-300"><strong>Rating:</strong> {movie.rating}</p>
        <p className="text-gray-300"><strong>Genres:</strong> {movie.genres.join(", ")}</p>
        <button className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
          Add to Cart
        </button>
      </div>
    ) : (
      <p className="text-center text-gray-100">Loading...</p>
    )
  );
}

export default MovieDetails;
