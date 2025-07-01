"use client";

import { useState, useEffect } from "react";
import MovieList from "./peliculas/MovieList";

export default function Home() {
  const [topMovies, setTopMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovies() {
      const movies = new Map();
      let page = 1;
      let fin = false;

      try {
        while (!fin) {
          const response = await fetch(
            `https://mflixbackend.azurewebsites.net/api/movies?pageSize=30&page=${page}`
          );
          const data = await response.json();

          // Valido si tengo duplicados
          data.forEach((movie) => {
            if (movie._id && !movies.has(movie._id)) {
              movies.set(movie._id, movie);
            }
          });

          if (data.length < 30) {
            fin = true;
          } else {
            page += 1;
          }
        }

        // Filtro top 10
        const top = Array.from(movies.values())
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
      <h2 className="text-2xl font-bold text-blue-700 mb-4">
        Top 10 películas según IMDb
      </h2>

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
