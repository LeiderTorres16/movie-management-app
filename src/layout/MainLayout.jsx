import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

function MainLayout({ sessionId, setSessionId }) {
  return (
    <div>
      <Navbar sessionId={sessionId} setSessionId={setSessionId} />
      <div className="p-6">
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
