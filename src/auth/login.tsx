import { useState } from 'react';
import { useAuth } from './provider';

const Form = () => {
  const [email, setEmail] = useState('');
  const { securityCode, login } = useAuth();

  const submitForm = event => {
    event.preventDefault();

    login(email);
  };

  if (securityCode) {
    return <div>Waiting for {securityCode}</div>;
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

export default Form;
