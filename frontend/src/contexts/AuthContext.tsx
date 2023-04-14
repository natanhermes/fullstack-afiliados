import Router from 'next/router';

import { createContext, ReactNode, useEffect, useState } from 'react';

import { setCookie, parseCookies, destroyCookie } from 'nookies';

import { api } from '../services/client';
import { AxiosError } from 'axios';

interface User {
  id: string;
  name: string;
  email: string;
  created_at: string;
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
        .then((user: User) => {
          setUser(user);
        })
        .catch((err) => {
          console.log(err);
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

      setUser(user);

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
