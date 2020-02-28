import Link, { LinkProps } from 'next/link';
import styled from '@emotion/styled';
import { FC } from 'react';

const A = styled.a`
  text-decoration: underline;
  color: inherit;
  cursor: pointer;
`;

const MyLink: FC<LinkProps> = ({ children, ...other }) => {
  return (
    <Link {...other}>
      <A>{children}</A>
    </Link>
  );
};

export default MyLink;
