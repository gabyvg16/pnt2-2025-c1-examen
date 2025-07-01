"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function MovieDetailPage() {
  const { id } = useParams();
  const [imageError, setImageError] = useState(false);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleImageError = () => {
    setImageError(true);
  };

  useEffect(() => {
    async function fetchMovie() {
      try {
        const response = await fetch(
          `https://mflixbackend.azurewebsites.net/api/movies/${id}`
        );
        const data = await response.json();
        setMovie(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie: ", error);
        setLoading(false);
      }
    }
    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <div>
        <p>Cargando detalle de pelicula...</p>
      </div>
    );
  }

  return (
    <main className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">{movie.title}</h1>
      {movie.poster && !imageError ? (
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-auto object-contain mb-4 rounded-md"
          onError={handleImageError}
        />
      ) : (
        <div className="w-full h-[200px] bg-gray-300 rounded-md flex items-center justify-center mb-4">
          <span className="text-gray-600">{movie.title}</span>
        </div>
      )}
      {/* Fullplot */}
      <p className="mb-4 text-sm text-gray-800">{movie.fullplot}</p>
    </main>
  );
}
