import { useState } from 'react';
import { useAuth } from './context';

const Form = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

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
          <button type="submit">Login</button>
        </p>
      </form>
    </div>
  );
};

export default Form;
