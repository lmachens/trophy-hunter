import { FC } from 'react';
import Discord from '../icons/Discord';
import Settings from '../icons/Settings';
import Support from '../icons/Support';
import Minimize from '../icons/Minimize';
import Maximize from '../icons/Maximize';
import Restore from '../icons/Restore';
import Close from '../icons/Close';
import styled from '@emotion/styled';

const Header = styled.header`
  display: flex;
  height: 40px;
`;

const Controls = styled.div`
  margin-left: auto;
  display: flex;
`;

const Button = styled.button`
  background-color: transparent;
  position: relative;
  width: 30px;
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
  return (
    <Header>
      <Controls>
        <DiscordButton className="icon window-control window-control-social discord">
          <Discord />
        </DiscordButton>
        <Button className="icon window-control">
          <Settings />
        </Button>
        <Button className="icon window-control">
          <Support />
        </Button>
        <Button className="icon window-control">
          <Minimize />
        </Button>
        <Button className="icon toggle-icons window-control">
          <Maximize />
          <Restore />
        </Button>
        <ExitButton className="icon window-control window-control-close">
          <Close />
        </ExitButton>
      </Controls>
    </Header>
  );
};

export default AppHeader;
