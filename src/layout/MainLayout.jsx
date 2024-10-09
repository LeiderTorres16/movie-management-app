import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../pages/Navbar'; // Importamos el Navbar global

function MainLayout({ sessionId, setSessionId }) {
  return (
    <div>
      <Navbar sessionId={sessionId} setSessionId={setSessionId} />
      <div className="p-6">
        {/* Outlet renderiza los componentes hijos (las rutas seleccionadas) */}
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
