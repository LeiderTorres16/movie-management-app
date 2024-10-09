import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DarkModeToggle from '../components/DarkModeToggle'; // Importa el toggle

function Navbar({ sessionId, setSessionId }) {
  const navigate = useNavigate();

  // Función para manejar el proceso de logout
  const handleLogout = () => {
    localStorage.removeItem('session_id');
    setSessionId(null);
    navigate('/login');
  };

  return (
    <nav className="bg-blue-500 text-white p-4 dark:bg-gray-900 dark:text-gray-100">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/inicio" className="text-xl font-bold">
          Movie Manager
        </Link>

        <div className="space-x-4 flex items-center">
          <Link to="/dashboard" className="hover:text-gray-300">
            Dashboard
          </Link>
          <Link to="/manage-lists" className="hover:text-gray-300">
            Mis Listas
          </Link>
          {sessionId ? (
            <button onClick={handleLogout} className="hover:text-gray-300">
              Cerrar Sesión
            </button>
          ) : (
            <Link to="/login">
              <button className="hover:text-gray-300">Iniciar Sesión</button>
            </Link>
          )}
          {/* Toggle de Modo Oscuro */}
          <DarkModeToggle />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
