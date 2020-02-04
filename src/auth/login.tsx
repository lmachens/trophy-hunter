import { useState } from 'react';
import { useAuth } from './context';

const Form = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, register } = useAuth();

  const submitForm = event => {
    event.preventDefault();

    login(email, password);
  };

  return (
    <div>
      <form onSubmit={submitForm}>
        <p>
          Email:{' '}
          <input type="text" onChange={event => setEmail(event.target.value)} />
        </p>
        <p>
          Password:{' '}
          <input
            type="password"
            onChange={event => setPassword(event.target.value)}
          />
        </p>
        <p>
          <button disabled={!email || !password} type="submit">
            Login
          </button>
          <button
            disabled={!email || !password}
            onClick={() => register(email, password)}
          >
            Register
          </button>
        </p>
      </form>
    </div>
  );
};

export default Form;
