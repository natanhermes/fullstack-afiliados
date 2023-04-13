import Router from 'next/router';

import { createContext, ReactNode, useEffect, useState } from 'react';

import { setCookie, parseCookies, destroyCookie } from 'nookies';

import { api } from '../services/client';
import { AxiosError, AxiosResponse } from 'axios';

interface User {
  name: string;
  email: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface SignUpData {
  name: string;
  email: string;
  password: string;
}

interface AuthContextData {
  signIn(credentials: SignInCredentials): Promise<void>;
  signUp(data: SignUpData): Promise<number>;
  signOut(): void;
  user?: User;
  isAuthenticated: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function signOut() {
  destroyCookie(undefined, 'afiliados.token');

  Router.push('/');
}

async function getUserData() {
  const response = await api.get('/me');

  return response.data.user;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'afiliados.token': token } = parseCookies();

    if (token) {
      getUserData()
        .then((response: AxiosResponse) => {
          const { email, name } = response.data;

          setUser({ email, name });
        })
        .catch(() => {
          signOut();
        });
    }
  }, []);

  async function signUp({ email, name, password }: SignUpData) {
    try {
      const response = await api.post('/users', {
        email,
        name,
        password,
      });

      return response.status;
    } catch (error) {
      throw new AxiosError(error as string);
    }
  }

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('sessions', {
        email,
        password,
      });

      const { token } = response.data;

      setCookie(undefined, 'afiliados.token', token, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      });

      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      const user = await getUserData();

      setUser({
        email: user.email,
        name: user.name,
      });

      Router.push('/dashboard');
    } catch (err) {
      throw new AxiosError(err as string);
    }
  }

  return (
    <AuthContext.Provider
      value={{ signIn, signOut, signUp, isAuthenticated, user }}
    >
      {children}
    </AuthContext.Provider>
  );
}
