import React from 'react'

export default function Inicio() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center dark:bg-gray-800 rounded-lg">
      {/* Encabezado */}
      <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4 text-center dark:text-white">
        Bienvenido a Movie Manager
      </h1>

      {/* Descripción */}
      <p className="text-lg md:text-xl text-gray-600 text-center max-w-2xl mb-8 dark:text-white">
        Administra tus películas favoritas, crea listas personalizadas y explora los detalles
        de las últimas películas. Todo en un solo lugar.
      </p>

    </div>
  );
}
