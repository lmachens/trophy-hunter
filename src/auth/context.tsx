import { createContext, useContext, useState, FC } from 'react';
import { setAuthToken, clearAuthToken } from './cookie';

const AuthContext = createContext(null);

const LOGIN_URL = '/api/login';
const LOGOUT_URL = '/api/logout';
const REGISTER_URL = '/api/register';

interface AuthProviderProps {
  initialUser: any;
}

export const AuthProvider: FC<AuthProviderProps> = ({
  children,
  initialUser
}) => {
  const [user, setUser] = useState(initialUser);

  async function login(email, password) {
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    };
    try {
      const response = await fetch(LOGIN_URL, options);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Email not found, please retry');
        }
        if (response.status === 401) {
          throw new Error('Email and password do not match, please retry');
        }
      }
      const user = await response.json();
      setAuthToken(user.authToken);
      setUser(user);
    } catch (error) {
      console.error(error);
    }
  }

  async function logout() {
    await fetch(LOGOUT_URL, { method: 'POST' });
    clearAuthToken();
    setUser(null);
  }

  async function register(email, password) {
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    };
    try {
      const response = await fetch(REGISTER_URL, options);
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const user = await response.json();
      setAuthToken(user.authToken);
      setUser(user);
    } catch (error) {
      console.error(error);
    }
  }

  const value = {
    user,
    login,
    logout,
    register
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  return useContext(AuthContext);
}
