import React, { useState, useEffect } from "react";
import useListStore from "../store/listStore";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
//import useAuthStore from "../store/authStore";

function ManageLists() {
  const lists = useListStore((state) => state.lists);
  const addList = useListStore((state) => state.addList);
  const addMovieToList = useListStore((state) => state.addMovieToList);
  const clearList = useListStore((state) => state.clearList);
  const deleteList = useListStore((state) => state.deleteList);
  const removeMovieFromList = useListStore(
    (state) => state.removeMovieFromList
  );
  const [newListName, setNewListName] = useState("");
  const [selectedList, setSelectedList] = useState("");
  const [movieToAdd, setMovieToAdd] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const sessionId = localStorage.getItem("session_id");

    if (!sessionId) {
      navigate("/login");
    }
  }, [navigate]);

  const handleCreateList = () => {
    if (newListName) {
      addList(newListName);
      setNewListName("");
    }
  };

  const handleAddMovieToList = () => {
    if (selectedList && movieToAdd) {
      const movie = { id: Date.now(), title: movieToAdd };
      addMovieToList(selectedList, movie);
      setMovieToAdd("");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen dark:bg-gray-800 rounded-lg">
      <h1 className="text-3xl font-bold mb-4 dark:text-white">
        Gestionar Listas de Películas
      </h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Nombre de la nueva lista"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full md:w-1/5 mr-5"
        />
        <button
          onClick={handleCreateList}
          className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Crear Lista
        </button>
      </div>

      <div className="mb-4">
        <select
          onChange={(e) => setSelectedList(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full md:w-1/5 mr-5"
        >
          <option value="">Selecciona una lista</option>
          {lists.map((list) => (
            <option key={list.name} value={list.name}>
              {list.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Nombre de la película a agregar"
          value={movieToAdd}
          onChange={(e) => setMovieToAdd(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full md:w-1/5 mt-2 mr-5"
        />
        <button
          onClick={handleAddMovieToList}
          className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Agregar a la lista
        </button>
      </div>

      <h2 className="text-2xl font-semibold mb-4 dark:text-white">
        Listas Existentes:
      </h2>
      <ul className="space-y-4">
        {lists.map((list) => (
          <li key={list.name} className="bg-white p-4 rounded shadow ">
            <div className="flex justify-start items-center">
              <h3 className="text-xl font-bold">{list.name}</h3>
              <div className="flex space-x-2 mt-1 ml-10">
                <button
                  onClick={() => clearList(list.name)}
                  className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                >
                  Borrar Todas las Películas
                </button>
                <button
                  onClick={() => deleteList(list.name)}
                  className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                >
                  Eliminar Lista
                </button>
              </div>
            </div>
            <ul className="mt-2 space-y-2">
              <h3 className="text-1xl font-semibold mb-4">
                Peliculas:
              </h3>
              {list.movies.map((movie) => (
                <li key={movie.id} className="flex justify-start items-center">
                  <span>{movie.title}</span>

                  <div className="mt-2 flex justify-between ml-5">
                    <div className="flex items-start">
                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={() => removeMovieFromList(list.name, movie.id)}
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageLists;
