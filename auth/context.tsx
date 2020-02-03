import { createContext, useContext, useState, FC } from 'react';
import { setAuthToken, clearAuthToken } from './cookie';

const AuthContext = createContext(null);

const LOGIN_URL = '/api/login';
const LOGOUT_URL = '/api/logout';

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
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: `email=${email}&password=${password}`
    };
    const response = await fetch(LOGIN_URL, options);

    if (!response.ok) {
      if (response.status === 404) {
        alert('Email not found, please retry');
      }
      if (response.status === 401) {
        alert('Email and password do not match, please retry');
      }
    }
    const user = await response.json();
    setAuthToken(user.token);
    setUser(user);
  }

  async function logout() {
    await fetch(LOGOUT_URL, { method: 'POST' });
    clearAuthToken();
    setUser(null);
  }

  const value = {
    user,
    login,
    logout
  };

  console.log('refresh', user);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  return useContext(AuthContext);
}
