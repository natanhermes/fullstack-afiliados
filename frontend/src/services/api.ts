import axios, { AxiosError } from 'axios';
import { parseCookies } from 'nookies';

import { signOut } from '../contexts/AuthContext';

function isBrowser() {
  return (
    typeof window !== 'undefined' && typeof window.navigator !== 'undefined'
  );
}

export function setupAPIClient(ctx = undefined) {
  const cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      Authorization: `Bearer ${cookies['afiliados.token']}`,
    },
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        if (isBrowser()) {
          signOut();
        }
      }

      return Promise.reject(error);
    },
  );

  return api;
}
