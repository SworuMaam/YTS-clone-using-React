import axios from 'axios';

const BASE_URL = 'https://yts.mx/api/v2/';

export async function fetchMovies(url) {
    try {
        const response = await axios.get(url);
        return response.data.data.movies || [];
    } catch (error) {
        console.error('Error fetching movies:', error);
        return [];
    }
}

export async function searchMovies(query) {
    try {
        const response = await axios.get(`${BASE_URL}list_movies.json?query_term=${query}`);
        return response.data.data.movies || [];
    } catch (error) {
        console.error("Error searching movies:", error);
        return [];
    }
}
