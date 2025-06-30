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
    <div>
      <h1>{movie.title}</h1>
      {movie.poster && !imageError ? (
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-[135px] object-cover rounded-md"
          onError={handleImageError}
        />
      ) : (
        <div className="w-full h-[135px] bg-gray-300 rounded-md flex items-center justify-center">
          <span className="text-xs text-gray-600 text-center">
            {movie.title}
          </span>
        </div>
      )}
      {/* Fullplot */}
      <p className="text-xs mt-1 truncate">{movie.fullplot}</p>
    </div>
  );
}
