import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Inicio from "./pages/Inicio";
import ProtectedRoute from "./helpers/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import AuthCallback from "./helpers/AuthCallback";
import ManageLists from "./pages/ManageLists";
import MovieDetails from "./pages/MovieDetails";
import MainLayout from "./layout/MainLayout";
import React, { useState, useEffect } from 'react';

function App() {

  const [sessionId, setSessionId] = useState(localStorage.getItem('session_id'));


  useEffect(() => {
    // Actualiza el estado cuando el sessionId cambia en localStorage
    const storedSessionId = localStorage.getItem('session_id');
    if (storedSessionId) {
      setSessionId(storedSessionId);
    }
  }, []);

  return (
    <Router>
      <Routes>
      <Route path="/" element={<MainLayout sessionId={sessionId} setSessionId={setSessionId} />}>
      <Route path="/inicio" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/callback" element={<AuthCallback setSessionId={setSessionId} />} />
        <Route path="/manage-lists" element={<ProtectedRoute> <ManageLists /> </ProtectedRoute>} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>}/>      
      </Route>
      </Routes>
    </Router>
  );
}

export default App;
