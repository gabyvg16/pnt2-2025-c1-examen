"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function MovieCard({ movie }) {
  const [imageError, setImageError] = useState(false);
  // Favorito
  const [favorito, setFavorito] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="w-[90px] text-center">
      {/* Link */}
      <Link href={`/peliculas/${movie._id}`}>
        <div>
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
          <p className="text-xs mt-1 truncate">{movie.title}</p>

          {/* Fullplot */}
          <p className="text-xs mt-1 truncate">{movie.fullplot}</p>
        </div>
      </Link>

      {/* Boton de favorito */}
      <button
        onClick={() => setFavorito(!favorito)}
        title={favorito ? "Elimininar de favoritos" : "Agregar a favoritos"}
      >
        {favorito ? "❤️" : "🤍"}
      </button>
    </div>
  );
}
