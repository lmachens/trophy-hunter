import { useState } from 'react';
import Discord from '../icons/Discord';
import Support from '../icons/Support';
import styled from '@emotion/styled';
import Feedback from '../icons/Feedback';
import FeedbackModal from '../modals/FeedbackModal';
import Grow from '../common/Grow';
import AfterMatch from '../matches/AfterMatch';
import Background from './Background';
import LogoContainer from './LogoContainer';
import Logo from './Logo';
import Toolbar from './Toolbar';
import HeaderButton from './HeaderButton';
import ExitButton from './ExitButton';
import MinimizeButton from './MinimizeButton';
import MovableHeader from './MovableHeader';

const DiscordButton = styled(HeaderButton)`
  &:hover,
  &:active {
    background-color: #7289da;
  }
`;
const DiscordButtonLink = DiscordButton.withComponent('a');

const WriteUsFeedback = styled.div`
  font-family: 'Roboto Mono', monospace;
  font-size: 0.92rem;
  text-transform: uppercase;
  padding: 0 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    background-color: #958fb2;
  }
`;

const AfterMatchIcon = styled(AfterMatch)`
  margin-left: 10px;
`;

const AppHeader = () => {
  const [showFeedback, setShowFeedback] = useState(false);

  return (
    <>
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
        <Toolbar>
          <AfterMatchIcon />
          <Grow />
          <WriteUsFeedback onClick={() => setShowFeedback(true)}>
            <Feedback />
            Write us a feedback
          </WriteUsFeedback>
          <DiscordButtonLink href="https://discord.gg/dgZAmW" target="_blank">
            <Discord />
          </DiscordButtonLink>
          <HeaderButton>
            <Support />
          </HeaderButton>
          <MinimizeButton />
          <ExitButton />
        </Toolbar>
      </MovableHeader>
      {showFeedback && <FeedbackModal onClose={() => setShowFeedback(false)} />}
    </>
  );
};

export default AppHeader;
