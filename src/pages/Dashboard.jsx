import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import { useNavigate } from "react-router-dom";
import { Search, Filter } from "lucide-react";

const apiKey = process.env.REACT_APP_TMDB_API_KEY;

function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [language, setLanguage] = useState("");
  const [region, setRegion] = useState("");
  const [year, setYear] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const sessionId = localStorage.getItem("session_id");
    if (!sessionId) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchDefaultMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=${sortBy}&language=${language}&region=${region}&year=${year}&page=${currentPage}`
        );
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
      } catch (error) {
        console.error("Error al obtener películas por defecto", error);
      }
    };

    const fetchSearchedMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}&page=${currentPage}&sort_by=${sortBy}&language=${language}&region=${region}&year=${year}`
        );
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
      } catch (error) {
        console.error("Error al buscar películas", error);
      }
    };

    if (searchTerm) {
      fetchSearchedMovies();
    } else {
      fetchDefaultMovies();
    }
  }, [searchTerm, sortBy, language, region, year, currentPage]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen dark:bg-gray-800 rounded-lg">
      <h1 className="text-4xl font-bold mb-6 text-center dark:text-white">
        Dashboard
      </h1>

      <div className="flex items-center gap-2 mb-4">
        <div className="relative flex-1">
          <input
            type="text"
            className="p-2 border border-gray-300 rounded w-full pl-10"
            placeholder="Buscar películas..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <div className="absolute left-3 top-3">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
        </div>
        <button
          onClick={toggleFilters}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <Filter className="h-5 w-5 mr-2" />
          Filtros
        </button>
      </div>

      {showFilters && (
        <div className="transition-all duration-300 ease-in-out mb-4 flex flex-col md:flex-row md:space-x-4">
          <div className="flex flex-col">
            <label className="font-semibold dark:text-white">Ordenar por:</label>
            <select
              className="p-2 border border-gray-300 rounded"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="popularity.desc">Popularidad</option>
              <option value="release_date.desc">Fecha de lanzamiento</option>
              <option value="vote_average.desc">Calificación</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="font-semibold dark:text-white">Idioma:</label>
            <input
              type="text"
              className="p-2 border border-gray-300 rounded"
              placeholder="Ejemplo: en, es"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold dark:text-white">Región:</label>
            <input
              type="text"
              className="p-2 border border-gray-300 rounded"
              placeholder="Ejemplo: US, ES"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold dark:text-white">Año:</label>
            <input
              type="number"
              className="p-2 border border-gray-300 rounded"
              placeholder="Ejemplo: 2020"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
        </div>
      )}

      <h2 className="text-2xl font-semibold mb-4 dark:text-white">
        Resultados de la búsqueda:
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      <div className="flex justify-between mt-4">
        <p>
          Página {currentPage} de {totalPages}
        </p>
        <div>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded"
            onClick={() =>
              setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))
            }
            disabled={currentPage === totalPages}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
