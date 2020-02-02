import { NextPage } from 'next';
import gql from 'graphql-tag';
import Form from '../auth/login';

interface Props {
  me: any;
}

const Index: NextPage<Props> = ({ me }) => (
  <main>
    Hello: {me?.name}
    {!me && <Form />}
    {me && (
      <button
        onClick={async () => {
          await fetch('/api/logout', { method: 'POST' });
          document.cookie = 'jwt=;Max-Age=0;';
        }}
      >
        Logout
      </button>
    )}
  </main>
);

Index.getInitialProps = async ({ apolloClient }) => {
  const result = await apolloClient.query({
    query: gql`
      {
        me {
          name
          token
        }
      }
    `
  });
  const { me } = result.data;

  return { me };
};

export default Index;
