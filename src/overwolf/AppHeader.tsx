import { FC } from 'react';
import Discord from '../icons/Discord';
import Settings from '../icons/Settings';
import Support from '../icons/Support';
import Minimize from '../icons/Minimize';
import Maximize from '../icons/Maximize';
import Restore from '../icons/Restore';
import Close from '../icons/Close';
import styled from '@emotion/styled';
import { useOverwolfWindow } from './OverwolfWindow';

const Header = styled.header`
  display: flex;
  height: 48px;
`;

const Background = styled.svg`
  position: absolute;
  z-index: -1;
  height: 48px;
  fill: #3f3e43;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  width: 175px;
  height: 27px;
  margin-left: 14px;
`;

const Toolbar = styled.div`
  height: 30px;
  flex-grow: 1;
  background: #3f3e43;
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  background-color: transparent;
  width: 50px;
  height: 30px;
  transition: 0.15s;
  color: #eaeaea;
  border: none;
  padding: 0;
  cursor: pointer;

  svg {
    width: 100%;
    height: 100%;
  }

  :focus {
    outline: none;
  }

  &:hover,
  &:active {
    color: #fff;
    background-color: #958fb2;
  }
`;

const DiscordButton = styled(Button)`
  &:hover,
  &:active {
    background-color: #7289da;
  }
`;

const ExitButton = styled(Button)`
  &:hover,
  &:active {
    background-color: #dd2a30;
  }
`;

const AppHeader: FC = () => {
  const { isMaximized } = useOverwolfWindow();

  return (
    <Header>
      <LogoContainer>
        <Logo src="/trophy-hunter-logo.png" />
        <Background viewBox="0 0 200 48" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0H200V30H200L183 48H0V0Z" />
        </Background>
      </LogoContainer>

      <Toolbar>
        <DiscordButton>
          <Discord />
        </DiscordButton>
        <Button>
          <Settings />
        </Button>
        <Button>
          <Support />
        </Button>
        <Button>
          <Minimize />
        </Button>
        <Button>{isMaximized ? <Restore /> : <Maximize />}</Button>
        <ExitButton>
          <Close />
        </ExitButton>
      </Toolbar>
    </Header>
  );
};

export default AppHeader;
