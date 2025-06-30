"use client";

import { useState, useEffect } from "react";
import MovieList from "./peliculas/MovieList";

export default function Home() {
  const [topMovies, setTopMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovies() {
      let movies = [];
      let page = 1;
      let fin = false;
      try {
        while (!fin) {
          const response = await fetch(
            `https://mflixbackend.azurewebsites.net/api/movies?pageSize=30&page=${page}`
          );
          const data = await response.json();

          movies = movies.concat(data);

          if (data.length < 30) {
            fin = true;
          } else {
            page += 1;
          }
        }

        const top = movies
          .filter((movie) => movie.imdb?.rating)
          .sort((a, b) => b.imdb.rating - a.imdb.rating)
          .slice(0, 10);

        setTopMovies(top);
        setLoading(false);
      } catch (error) {
        console.error("Error top movies:", error);
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  return (
    <main className="container mx-auto p-4">
      {loading ? (
        <p>Cargando películas...</p>
      ) : (
        <>
          <MovieList movies={topMovies} />
        </>
      )}
    </main>
  );
}
