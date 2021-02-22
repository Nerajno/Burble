import React, { useEffect, useState } from "react";
import Movie from "./components/Movie";

const FEATURED_API =
  "https://api.themoviedb.org/3/discover/movie?api_key=cc9531648a8a47fec779d75e4d9461f6&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1";

const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?api_key=cc9531648a8a47fec779d75e4d9461f6&language=en-US&page=1&include_adult=false";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState(" "); 

  useEffect(() => {
    fetch(FEATURED_API)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setMovies(data.results);
      });
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    fetch(SEARCH_API+searchTerm)
      .then((res) => res.json())
      .then((data) => {
         console.log(data);
        setMovies(data.results);
      });
  };

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
    <header>
      <form onSubmit={handleOnSubmit}>
      <input className="search" type="search" value={searchTerm} onChange={handleOnChange} placeholder="Search...." />
      </form>
      </header>
    <div className="movie-container">
      {movies.length > 0 &&
        movies.map((movie) => <Movie key={movie.id} {...movie} />)}
    </div>
    </>
  );
}

export default App;