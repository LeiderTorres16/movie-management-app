import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const apiKey = process.env.REACT_APP_TMDB_API_KEY;

function Login() {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  // Función para obtener el request token
  const getRequestToken = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`
      );
      const { request_token } = response.data;

      // Redirige al usuario a TMDB para que autorice el request token
      window.location.href = `https://www.themoviedb.org/authenticate/${request_token}?redirect_to=${window.location.origin}/auth/callback`;
    } catch (error) {
      console.error("Error al obtener el request token", error);
    }
  };

  // Manejar la respuesta de la redirección
  useEffect(() => {
    const createSession = async (requestToken) => {
      try {
        const response = await axios.post(
          `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}`,
          {
            request_token: requestToken,
          }
        );
        const { session_id } = response.data;
        login(session_id);
        navigate("/dashboard");
      } catch (error) {
        console.error("Error al crear la sesión", error);
      }
    };

    const urlParams = new URLSearchParams(window.location.search);
    const requestToken = urlParams.get("request_token");
    const approved = urlParams.get("approved");

    if (requestToken && approved === "true") {
      createSession(requestToken);
    }
  }, [login, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800 rounded-lg">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-6">Iniciar Sesión</h1>
        <button
          onClick={getRequestToken}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Iniciar Sesión con TMDB
        </button>
      </div>
    </div>
  );
}

export default Login;
