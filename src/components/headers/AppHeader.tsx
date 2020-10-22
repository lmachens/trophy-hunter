import { useState, FC } from 'react';
import Discord from '../icons/Discord';
import Support from '../icons/Support';
import styled from '@emotion/styled';
import Feedback from '../icons/Feedback';
import FeedbackModal from '../modals/FeedbackModal';
import Grow from '../common/Grow';
import AfterMatch from '../matches/AfterMatch';
import HeaderButton from './HeaderButton';
import Status from '../common/Status';
import { useAccount } from '../../contexts/account';
import HelpModal from '../guides/HelpModal';
import AlienwareChallenge from './AlienwareChallenge';
import Header from './Header';
import ErrorBoundary from '../common/ErrorBoundary';

const DiscordButtonLink = HeaderButton.withComponent('a');

const WriteUsFeedback = styled.div`
  font-family: 'Roboto Mono', monospace;
  font-size: 0.92rem;
  text-transform: uppercase;
  padding: 0 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: 10px;
  background-color: none;

  &:hover {
    background: linear-gradient(158.54deg, #ef1acd -1.09%, #efb31a 109.64%);
  }

  &:hover > svg {
    fill: #ffffff;
  }
`;

const AppHeader: FC = () => {
  const { loading, account } = useAccount();

  const [showFeedback, setShowFeedback] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  return (
    <>
      <Header exitable resizable>
        <ErrorBoundary>
          <Status />
          {account && !loading && <AfterMatch />}
          <Grow />
          <WriteUsFeedback onClick={() => setShowFeedback(true)}>
            <Feedback />
            Write us a feedback
          </WriteUsFeedback>
          <AlienwareChallenge />
        </ErrorBoundary>
        <DiscordButtonLink href="https://discord.gg/NTZu8Px" target="_blank">
          <Discord />
        </DiscordButtonLink>
        <HeaderButton onClick={() => setShowHelp(true)}>
          <Support />
        </HeaderButton>
      </Header>
      {showFeedback && <FeedbackModal onClose={() => setShowFeedback(false)} />}
      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
    </>
  );
};

export default AppHeader;
