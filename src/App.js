import { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

const API_URL = "https://www.omdbapi.com/?apikey=bc5b6f4a";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState("");

  async function searchMovies(title) {
    const response = await fetch(`${API_URL}&s=${title}`);
    const movieData = await response.json();

    console.log(movieData);
    setMovies(movieData.Search);
  }

  useEffect(() => {
    searchMovies("drishyam");
  }, []);

  var submitText = document.getElementById("submitText");

  if (submitText) {
    submitText.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("submitBtn").click();
      }
    });
  }

  return (
    <div className="app">
      <h1>Moviephilic</h1>
      <div className="search">
        <input
          id="submitText"
          placeholder="Search for Movies"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <img
          id="submitBtn"
          src={SearchIcon}
          alt="search icon"
          onClick={() => searchMovies(searchText)}
        />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((eachMovie) => (
            <MovieCard movie={eachMovie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2> No Movie found</h2>
        </div>
      )}
    </div>
  );
}

export default App;
