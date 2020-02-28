import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const VERIFY_URL = '/api/verify';

const Verify: NextPage = () => {
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    async function verify() {
      await fetch(`${VERIFY_URL}?token=${token}`);
    }
    verify();
  }, [token]);

  return <main>Verifying Login</main>;
};

export default Verify;
