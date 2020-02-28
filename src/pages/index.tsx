import { NextPage } from 'next';
import Link from 'next/link';
import { useAuth } from '../auth/provider';
import { clearAuthToken } from '../auth/authToken';

const LOGOUT_URL = '/api/logout';

const Index: NextPage = () => {
  const { user, setUser } = useAuth();

  async function logout() {
    await fetch(LOGOUT_URL, { method: 'POST' });
    clearAuthToken();
    setUser(null);
  }

  return (
    <main>
      <p>User: {user ? user.email : 'Not logged in'}</p>
      {!user && <Link href="/login">Login</Link>}
      {user && <button onClick={logout}>Logout</button>}
    </main>
  );
};

export default Index;
