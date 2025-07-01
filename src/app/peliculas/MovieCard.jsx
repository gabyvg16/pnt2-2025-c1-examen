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
    <div className="rounded p-2 bg-white shadow-sm flex flex-col justify-between h-full text-sm">
      {/* Link */}
      <Link href={`/peliculas/${movie._id}`}>
        <div className="cursor-pointer">
          {movie.poster && !imageError ? (
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-40 object-cover rounded"
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-40 bg-gray-300 flex items-center justify-center rounded">
              <span className="text-gray-600 text-center px-2">
                {movie.title}
              </span>
            </div>
          )}
          <h3 className="mt-2 font-semibold truncate">{movie.title}</h3>

          {/* Fullplot */}
          <p className="text-xs text-gray-600 mt-1 overflow-hidden h-[48px]">
            {movie.fullplot || "No hay descripción disponible"}
          </p>
        </div>
      </Link>

      {/* Boton de favorito */}
      <div className="mt-2 text-right">
        <button
          onClick={() => setFavorito(!favorito)}
          title={favorito ? "Elimininar de favoritos" : "Agregar a favoritos"}
        >
          {favorito ? "❤️" : "🤍"}
        </button>
      </div>
    </div>
  );
}
