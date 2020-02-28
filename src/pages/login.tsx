import { NextPage } from 'next';
import { useAuth } from '../auth/provider';
import { useState, useEffect } from 'react';
import { setAuthToken } from '../auth/authToken';
import { queryMe } from '../auth/queries';
import { useApolloClient } from '@apollo/react-hooks';
import useStorage from '../utils/useStorage';

const LOGIN_URL = '/api/login';

const Login: NextPage = () => {
  const [email, setEmail] = useState('');
  const [securityCode, setSecurityCode] = useStorage('securityCode');

  const { setUser } = useAuth();

  const apolloClient = useApolloClient();

  useEffect(() => {
    if (!securityCode) {
      return;
    }
    const interval = setInterval(() => {
      queryMe(apolloClient).then(user => {
        if (user) {
          setUser(user);
          setSecurityCode('');
          clearInterval(interval);
        }
      });
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [securityCode]);

  async function login(email) {
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ email })
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

  const submitForm = event => {
    event.preventDefault();

    login(email);
  };

  if (securityCode) {
    return (
      <div>
        Waiting for {securityCode}
        <div>
          <button onClick={() => setSecurityCode(null)}>Restart</button>
        </div>
      </div>
    );
  }
  return (
    <div>
      <form onSubmit={submitForm}>
        <p>
          Email:{' '}
          <input type="text" onChange={event => setEmail(event.target.value)} />
        </p>
        <p>
          <button disabled={!email} type="submit">
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
