import { NextPage } from "next";

interface Props {
  userAgent?: string;
}

const Index: NextPage<Props> = ({ userAgent }) => (
  <main>Your user agent: {userAgent}</main>
);

Index.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers["user-agent"] : navigator.userAgent;
  return { userAgent };
};

export default Index;
