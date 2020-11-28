import { useState, FC, useCallback } from 'react';
import Discord from '../icons/Discord';
import Support from '../icons/Support';
import styled from '@emotion/styled';
import Feedback from '../icons/Feedback';
import Share from '../icons/Share';
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
import ShareModal from '../guides/ShareModal';
import SizeButton from './SizeButton';
import ExitButton from './ExitButton';
import MinimizeButton from './MinimizeButton';

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

const InnerToolbar = styled.div`
  display: flex;
  min-width: 440px;
`;

type ModalName = 'feedback' | 'help' | 'share';
const AppHeader: FC = () => {
  const { loading, account } = useAccount();
  const [modal, setModal] = useState<ModalName>(null);

  const closeModal = useCallback(() => setModal(null), []);
  const openModal = useCallback((name: ModalName) => () => setModal(name), []);

  return (
    <>
      <Header>
        <ErrorBoundary>
          <Status />
          {account && !loading && <AfterMatch />}
        </ErrorBoundary>
        <Grow />
        <InnerToolbar>
          <ErrorBoundary>
            <WriteUsFeedback onClick={openModal('feedback')}>
              <Feedback />
              Write us a feedback
            </WriteUsFeedback>
            <Grow />
            <AlienwareChallenge />
          </ErrorBoundary>
          <DiscordButtonLink href="https://discord.gg/NTZu8Px" target="_blank">
            <Discord />
          </DiscordButtonLink>
          <HeaderButton
            active={modal === 'share'}
            onClick={openModal('share')}
            data-tooltip-id="share"
          >
            <Share active={modal === 'share'} />
          </HeaderButton>
          <HeaderButton active={modal === 'help'} onClick={openModal('help')}>
            <Support />
          </HeaderButton>
          <MinimizeButton />
          <SizeButton />
          <ExitButton />
        </InnerToolbar>
      </Header>
      {modal === 'feedback' && <FeedbackModal onClose={closeModal} />}
      {modal === 'share' && <ShareModal onClose={closeModal} />}
      {modal === 'help' && <HelpModal onClose={closeModal} />}
    </>
  );
};

export default AppHeader;
