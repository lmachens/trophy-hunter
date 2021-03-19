import styled from '@emotion/styled';
import overwolf from '../../api/overwolf';
import { FC } from 'react';

const Header = styled.header`
  display: flex;
  height: 48px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 300;
`;

const MovableHeader: FC = ({ children }) => {
  return (
    <Header
      onMouseDown={() =>
        overwolf.windows.getCurrentWindow((result) => {
          overwolf.windows.dragMove(result.window.id);
        })
      }
    >
      {children}
    </Header>
  );
};

export default MovableHeader;
