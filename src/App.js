import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import "./App.css";
import SearchIcon from "./searchIcon.svg";

const API_URL = `https://www.omdbapi.com?apikey=58866ce2`;

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const searchMovies = async (title) => {
    try {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();
      return data.Search ? setMovies(data.Search) : setMovies([]);
    } catch (err) {
      setError(true);
      console.error(err)
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    searchMovies(searchTerm);
    if (error) setMovies([]);
  }, [searchTerm, error]);

  return (
    <div className="app">
      <h1>FlixFinder</h1>
      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="search icon"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>
      <div className="empty">{isLoading && <h2>Loading...</h2>}</div>
      {movies && movies.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          {!searchTerm
            ? ""
            : searchTerm && !isLoading && <h2>No movies found</h2>}
        </div>
      )}
    </div>
  );
};

export default App;
