import { FC } from 'react';
import Background from './Background';
import LogoContainer from './LogoContainer';
import Logo from './Logo';
import Toolbar from './Toolbar';
import MovableHeader from './MovableHeader';

interface HeaderProps {
  exitable?: boolean;
  resizable?: boolean;
}

const Header: FC<HeaderProps> = ({ children }) => {
  return (
    <MovableHeader>
      <LogoContainer>
        <Logo
          src={`${process.env.PUBLIC_DIR}/trophy-hunter-logo.png`}
          draggable={false}
        />
        <Background viewBox="0 0 200 48" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0H200V30H200L183 48H0V0Z" />
        </Background>
      </LogoContainer>
      <Toolbar>{children}</Toolbar>
    </MovableHeader>
  );
};

export default Header;
