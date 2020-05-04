import { FC, useState } from 'react';
import Discord from '../icons/Discord';
import Support from '../icons/Support';
import Minimize from '../icons/Minimize';
import Close from '../icons/Close';
import styled from '@emotion/styled';
import Link from '../common/Link';
import Feedback from '../icons/Feedback';
import FeedbackModal from '../modals/FeedbackModal';

const Header = styled.header`
  display: flex;
  height: 48px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
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
  display: block;
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
  align-items: center;
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

const WriteUsFeedback = styled.div`
  font-family: 'Roboto Mono', monospace;
  font-size: 0.92rem;
  text-transform: uppercase;
  padding: 0 10px;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #958fb2;
  }
`;

const AppHeader: FC = () => {
  const [showFeedback, setShowFeedback] = useState(false);

  return (
    <>
      <Header>
        <LogoContainer>
          <Link href="/">
            <Logo src={`${process.env.PUBLIC_DIR}/trophy-hunter-logo.png`} />
          </Link>
          <Background viewBox="0 0 200 48" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0H200V30H200L183 48H0V0Z" />
          </Background>
        </LogoContainer>
        <Toolbar>
          <WriteUsFeedback onClick={() => setShowFeedback(true)}>
            <Feedback />
            Write us a feedback
          </WriteUsFeedback>
          <DiscordButton>
            <Discord />
          </DiscordButton>
          <Button>
            <Support />
          </Button>
          <Button>
            <Minimize />
          </Button>
          <ExitButton onClick={() => overwolf.windows.getMainWindow().close()}>
            <Close />
          </ExitButton>
        </Toolbar>
      </Header>
      {showFeedback && <FeedbackModal onClose={() => setShowFeedback(false)} />}
    </>
  );
};

export default AppHeader;
