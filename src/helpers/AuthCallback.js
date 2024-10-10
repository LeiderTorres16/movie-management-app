import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const apiKey = process.env.REACT_APP_TMDB_API_KEY;

function AuthCallback({ setSessionId }) {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

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

        localStorage.setItem("session_id", session_id);
        setSessionId(session_id);

        login(session_id);
        navigate('/dashboard');
      } catch (error) {
        console.error('Error al crear la sesión', error);
      }
    };

    const urlParams = new URLSearchParams(window.location.search);
    const requestToken = urlParams.get('request_token');
    const approved = urlParams.get('approved');

    if (requestToken && approved === 'true') {
      createSession(requestToken);
    } else {
      navigate('/login');
    }
  }, [login, navigate, setSessionId]);

  return (
    <div>
      <h1>Autenticando...</h1>
    </div>
  );
}

export default AuthCallback;
