import React from "react";
import ReactDOM from "react-dom/client";
import "./Style.css"; 

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
// 3. MULTIPLE DATA OBJECTS — accessed via a SINGLE .map() loop
// Same shape of data as #2, but instead of manually writing out
// <MovieCard resData={movieList[0]} />, <MovieCard resData={movieList[1]} />...
// we let .map() loop over the array and render one card per item.
// This scales automatically — adding a 4th or 10th movie needs
// ZERO changes to this code, unlike the fixed-index version above.
// -----------------------------------------------------------
const actorList = [
  { id: 1, name: "Leonardo DiCaprio", knownFor: "Inception" },
  { id: 2, name: "Christian Bale", knownFor: "The Dark Knight" },
  { id: 3, name: "Fionn Whitehead", knownFor: "Dunkirk" },
];

const ActorCard = (props) => {
  const { resData } = props;
  return (
    <div className="actor-card">
      <h3>{resData.name}</h3>
      <p> - Known for: {resData.knownFor}</p>
      <br/>
    </div>
  );
};


// -----------------------------------------------------------
// 4. NESTED DATA ARRAY — accessed via DOUBLE .map() LOOP
// Each "director" has a nested array of their own movies.
// Outer .map() loops over directors, inner .map() loops over
// that director's movies — demonstrates looping over NESTED data.
//
// Optional chaining (?.) is applied on BOTH layers:
//   - on the outer "resData" (in case a director object is malformed/missing)
//   - on the inner "movies" array (in case a specific director has no movies list yet)
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
  // ─── Optional chaining on the OUTER data (resData itself) ───
  // "resData ?? {}" means: if resData is undefined/null, fall back to an
  // empty object instead of crashing when we try to destructure it.
  const { name, movies } = props.resData ?? {};

  return (
    <div className="director-card">
      <h3>{name}</h3>
      <ul>
        {/*
          ─── Optional chaining on the INNER data (movies array) ───
          "movies?.map(...)" means: if "movies" itself is undefined
          (e.g. this director has no movies list at all yet), stop here
          and render nothing instead of crashing with
          "Cannot read properties of undefined (reading 'map')".
        */}
        {movies?.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
};


const App = () => {
  return (
    <div className="app">
      <h1>Accessing Data Objects Demo</h1>

      {/* 1. Single object — rendered directly, no looping needed */}
      <FeaturedSection resData={featuredMovie} />

      {/* 2. Multiple objects — rendered by fixed index (no loop) */}
      <div className="movie-list">
        <MovieCard resData={movieList[0]} />
        <MovieCard resData={movieList[1]} />
        <MovieCard resData={movieList[2]} />
      </div>

      {/* 3. Multiple objects — rendered via a SINGLE .map() loop */}
      <div className="actor-list">
        {actorList.map((actor) => (
          <ActorCard key={actor.id} resData={actor} />
        ))}
      </div>

      {/* 4. Nested data — outer .map() loops over directors,
          each DirectorSection internally loops over its own movies
          using a DOUBLE .map(), with optional chaining on both layers */}
      <div className="director-list">
        {directorsData.map((director) => (
          <DirectorSection key={director.id} resData={director} />
        ))}
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);