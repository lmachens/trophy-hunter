import { NextPage } from 'next';
import Form from '../auth/login';
import { useAuth } from '../auth/context';

const Index: NextPage = () => {
  const { user, logout } = useAuth();

  return (
    <main>
      <p>User: {user ? user.email : 'Not logged in'}</p>
      {!user && <Form />}
      {user && <button onClick={logout}>Logout</button>}
    </main>
  );
};

export default Index;
