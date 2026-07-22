import React from "react";
import ReactDOM from "react-dom/client";

/**
 * Three ways of accessing JSON-like data objects and rendering them.
 * 1. Single data object (one nested object, accessed directly)
 * 2. Multiple data objects (array, accessed by fixed index)
 * 3. Nested data array (looped over with .map())
 */

// -----------------------------------------------------------
// 1. SINGLE DATA OBJECT
// One object with nested fields — accessed directly via dot notation.
// Good for things like a single banner/hero section that never repeats.
// -----------------------------------------------------------
const featuredMovie = {
  title: "Inception",
  poster: {
    url: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    alt: "Inception poster",
  },
  rating: 8.8,
};

const FeaturedSection = (props) => {
  const { resData } = props;
  return (
    <div className="featured">
      <img src={resData.poster.url} alt={resData.poster.alt} />
      <h2>{resData.title}</h2>
      <p>⭐ {resData.rating}</p>
    </div>
  );
};

// -----------------------------------------------------------
// 2. MULTIPLE DATA OBJECTS — accessed by fixed INDEX
// An array of objects, but instead of looping, each item is
// rendered explicitly using a hardcoded index (movieList[0], movieList[1]...)
// Fine for a small, fixed number of items — but doesn't scale well.
// -----------------------------------------------------------
const movieList = [
  { id: 1, title: "Interstellar", year: 2014, rating: 8.7 },
  { id: 2, title: "The Dark Knight", year: 2008, rating: 9.0 },
  { id: 3, title: "Dunkirk", year: 2017, rating: 7.9 },
];

const MovieCard = (props) => {
  const { resData } = props;
  return (
    <div className="movie-card">
      <h3>{resData.title}</h3>
      <p>{resData.year}</p>
      <p>⭐ {resData.rating}</p>
    </div>
  );
};

// -----------------------------------------------------------
// 3. NESTED DATA ARRAY — accessed via .map() LOOP
// Each "director" has a nested array of their own movies.
// Outer .map() loops over directors, inner .map() loops over
// that director's movies — demonstrates looping over NESTED data.
// -----------------------------------------------------------
const directorsData = [
  {
    id: 1,
    name: "Christopher Nolan",
    movies: [
      { id: 1, title: "Inception" },
      { id: 2, title: "Tenet" },
    ],
  },
  {
    id: 2,
    name: "Denis Villeneuve",
    movies: [
      { id: 1, title: "Dune" },
      { id: 2, title: "Arrival" },
    ],
  },
];

const DirectorSection = (props) => {
  const { resData } = props;
  return (
    <div className="director-card">
      <h3>{resData.name}</h3>
      <ul>
        {/* Inner loop — nested array inside each director object */}
        {resData.movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
};

const movieListStyle = {
  backgroundColor: "#e80f69",
  border: "2px solid #000000",
  borderRadius: "8px",
  padding: "16px",
  width: "220px",
  margin: "50px 0",
};

const directorListStyle = {
  backgroundColor: "#0fb2e8",
  border: "2px solid #000000",
  borderRadius: "8px",
  padding: "16px",
  width: "220px",
};

const App = () => {
  return (
    <div className="app">
      <h1>Accessing Data Objects Demo</h1>

      {/* 1. Single object — rendered directly, no looping needed */}
      <FeaturedSection resData={featuredMovie} />

      {/* 2. Multiple objects — rendered by fixed index (no loop) */}
      <div className="movie-list" style={movieListStyle}>
        <MovieCard resData={movieList[0]} />
        <MovieCard resData={movieList[1]} />
        <MovieCard resData={movieList[2]} />
      </div>

      {/* 3. Nested data — outer .map() loops over directors,
          each DirectorSection internally loops over its own movies */}
      <div className="director-list" style={directorListStyle}>
        {directorsData.map((director) => (
          <DirectorSection key={director.id} resData={director} />
        ))}
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);