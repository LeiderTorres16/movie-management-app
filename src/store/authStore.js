import { create } from 'zustand';

const useAuthStore = create((set) => ({
  sessionId: localStorage.getItem('session_id') || null,
  isAuthenticated: !!localStorage.getItem('session_id'),
  login: (sessionId) => {localStorage.setItem('session_id', sessionId); set({ sessionId, isAuthenticated: true }); },
  logout: () => { localStorage.removeItem('session_id'); set({ sessionId: null, isAuthenticated: false }); },
}));

export default useAuthStore;