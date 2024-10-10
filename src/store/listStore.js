import { create } from "zustand";

const useListStore = create((set) => ({
  lists: JSON.parse(localStorage.getItem("movie_lists")) || [],

  addList: (listName) =>
    set((state) => {
      const updatedLists = [...state.lists, { name: listName, movies: [] }];
      localStorage.setItem("movie_lists", JSON.stringify(updatedLists));
      return { lists: updatedLists };
    }),

  addMovieToList: (listName, movie) => set((state) => {
    const updatedLists = state.lists.map((list) => {
      if (list.name === listName) {

        const isDuplicate = list.movies.some((m) => m.title === movie.title);
        if (isDuplicate) {
          alert("La película ya está en esta lista.");
          return list;
        }
        return { ...list, movies: [...list.movies, movie] };
      }
      return list;
    });
    localStorage.setItem('movie_lists', JSON.stringify(updatedLists));
    return { lists: updatedLists };
  }),

  removeMovieFromList: (listName, movieId) =>
    set((state) => {
      const updatedLists = state.lists.map((list) => {
        if (list.name === listName) {
          return {
            ...list,
            movies: list.movies.filter((movie) => movie.id !== movieId),
          };
        }
        return list;
      });
      localStorage.setItem("movie_lists", JSON.stringify(updatedLists));
      return { lists: updatedLists };
    }),

  clearList: (listName) =>
    set((state) => {
      const updatedLists = state.lists.map((list) => {
        if (list.name === listName) {
          return { ...list, movies: [] };
        }
        return list;
      });
      localStorage.setItem("movie_lists", JSON.stringify(updatedLists));
      return { lists: updatedLists };
    }),

  deleteList: (listName) =>
    set((state) => {
      const updatedLists = state.lists.filter((list) => list.name !== listName);
      localStorage.setItem("movie_lists", JSON.stringify(updatedLists));
      return { lists: updatedLists };
    }),
    
}));

export default useListStore;
