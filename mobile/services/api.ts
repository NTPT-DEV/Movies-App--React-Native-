import axios from "axios";

export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};

export const fetchMovies = async ({ query }: { query?: string }) => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

  try {
    const response = await axios.get(endpoint, {
      headers: TMDB_CONFIG.headers,
    });

    if (!response.data) {
      throw new Error("No Response from API");
    }
    return response.data;
  } catch (error) {
    console.log(error, "Failed to fetch movies");
    throw new Error("Failed to fetch movies");
  }
};

// Get Movie Details by Id 

export const getMoviebyID = async ({ id }: { id: string }) => {
  const endpoint = `${TMDB_CONFIG.BASE_URL}/movie/${id}`;
  try {
    const response = await axios.get(endpoint, {
      headers: TMDB_CONFIG.headers,
    });
    if (!response.data) {
      throw new Error("No Response from API");
    }
    return response.data ;
  } catch (error) {
    console.log(error, "Failed to fetch movies");
    throw new Error("Failed to fetch movies");
  }
};


//// get Video Tailers by Id 
export const getVideobyID = async ({ id }: { id: string }) => {
  const endpoint = `${TMDB_CONFIG.BASE_URL}/movie/${id}/videos`;
  try {
    const response = await axios.get(endpoint, {
      headers: TMDB_CONFIG.headers,
    });
    if (!response.data) {
      throw new Error("No Response from API");
    }
    return response.data ;
  } catch (error) {
    console.log(error, "Failed to fetch movies");
    throw new Error("Failed to fetch movies");
  }
};

////// get Video Upcoming

export const getMoviesUpcoming = async () => {
  const today = new Date();
  const twoWeeksLater = new Date();
  twoWeeksLater.setDate(today.getDate() + 60);

  const from = today.toISOString().slice(0, 10); // YYYY-MM-DD
  const to = twoWeeksLater.toISOString().slice(0, 10);

  const endpoint = `${TMDB_CONFIG.BASE_URL}/discover/movie?language=en-US&page=1&sort_by=popularity.desc&primary_release_date.gte=${from}&primary_release_date.lte=${to}`;

  try {
    const response = await axios.get(endpoint, {
      headers: TMDB_CONFIG.headers,
    });

    if (!response.data || !response.data.results) {
      throw new Error("No Response from API");
    }

    const results = response.data.results 

    const onlyIgnoreMovies = ['in' ,'te', 'hi' , 'ta']
    const filterMovies = results.filter((movie : MovieDetails) => !onlyIgnoreMovies.includes(movie.original_language) && movie.poster_path !== null && movie.title !== null)

    return filterMovies
  } catch (error) {
    console.log("Failed to fetch movies", error);
    throw new Error("Failed to fetch movies");
  }
};


//// get Animation Trending 

export const getTrendAnimation = async () => {

  const endpoint = `${TMDB_CONFIG.BASE_URL}/discover/movie?with_genres=16&sort_by=popularity.desc&language=en-US&page=1`;;

  try {
    const response = await axios.get(endpoint, {
      headers: TMDB_CONFIG.headers,
    });

    if (!response.data || !response.data.results) {
      throw new Error("No Response from API");
    }

    const results = response.data.results 

    const trendAnimation = results.filter((movie: Movie) => movie.genre_ids.includes(16) && movie.poster_path !== null && movie.title !== null)

    return trendAnimation
  } catch (error) {
    console.log("Failed to fetch movies", error);
    throw new Error("Failed to fetch movies");
  }
};






