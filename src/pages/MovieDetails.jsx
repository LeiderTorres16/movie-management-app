import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import useListStore from "../store/listStore";
import { Star, Clock, Calendar, Plus } from "lucide-react";

const apiKey = process.env.REACT_APP_TMDB_API_KEY;

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const lists = useListStore((state) => state.lists); // Obtenemos las listas de películas
  const addMovieToList = useListStore((state) => state.addMovieToList);
  const [selectedList, setSelectedList] = useState("");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
        );
        setMovie(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener detalles de la película", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleAddMovieToList = () => {
    if (selectedList && movie) {
      addMovieToList(selectedList, movie); // Agrega la película a la lista seleccionada
      alert(`${movie.title} se ha agregado a la lista ${selectedList}`);
    }
  };

  if (loading) {
    return (
      <h2 className="text-center text-lg">
        Cargando detalles de la película...
      </h2>
    );
  }

  if (!movie) {
    return (
      <h2 className="text-center text-lg">
        No se encontraron detalles de la película.
      </h2>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:flex-shrink-0">
                <img
                  className="h-80 w-full object-cover md:w-48"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt="Movie poster"
                />
              </div>
              <div className="p-8">
                <h1 className="block mt-1 text-lg leading-tight font-medium text-black">
                  {movie.title}
                </h1>
                <p className="mt-2 text-gray-500">{movie.overview}</p>
                <div className="mt-4 flex items-center">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <span className="ml-2 text-sm text-gray-600">
                    {movie.vote_average.toFixed(1)}/10
                  </span>
                </div>
                <div className="mt-2 flex items-center">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <span className="ml-2 text-sm text-gray-600">
                    {movie.runtime} minutos
                  </span>
                </div>
                <div className="mt-2 flex items-center">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <span className="ml-2 text-sm text-gray-600">
                    Fecha de lanzamiento: {movie.release_date.split("-")[0]}
                  </span>
                </div>
                <select
                  value={selectedList}
                  onChange={(e) => setSelectedList(e.target.value)}
                  className="p-2 border border-gray-300 rounded mt-4 w-full md:w-1/5"
                >
                  <option value="">Selecciona una lista</option>
                  {lists.map((list) => (
                    <option key={list.name} value={list.name}>
                      {list.name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleAddMovieToList}
                  className="mt-4 flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Añadir a lista
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
