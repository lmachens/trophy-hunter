import { createContext, useContext, useState, FC, useEffect } from 'react';
import { setAuthToken, clearAuthToken } from './cookie';
import { queryMe } from './queries';
import { useApolloClient } from '@apollo/react-hooks';
import useStorage from '../utils/useStorage';

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
  const [securityCode, setSecurityCode] = useStorage('securityCode');

  const apolloClient = useApolloClient();

  useEffect(() => {
    if (!initialUser) {
      clearAuthToken();
    }
  }, [initialUser]);

  useEffect(() => {
    if (!securityCode) {
      return;
    }
    const interval = setInterval(() => {
      console.log('try to update');
      queryMe(apolloClient).then(user => {
        if (user) {
          setUser(user);
          setSecurityCode('');
          clearInterval(interval);
        }
      });
    }, 2000);
  }, [securityCode]);

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
      const { securityCode, authToken } = await response.json();
      setAuthToken(authToken);
      setSecurityCode(securityCode);
    } catch (error) {
      console.error(error);
    }
  }

  async function logout() {
    await fetch(LOGOUT_URL, { method: 'POST' });
    clearAuthToken();
    setUser(null);
  }

  const value = {
    user,
    login,
    logout,
    securityCode
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  return useContext(AuthContext);
}
