import NextLink, { LinkProps } from 'next/link';
import styled from '@emotion/styled';
import { FC } from 'react';

const A = styled.a`
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  display: flex;
`;

const Link: FC<LinkProps> = ({ children, ...other }) => {
  return (
    <NextLink {...other}>
      <A>{children}</A>
    </NextLink>
  );
};

export default Link;
