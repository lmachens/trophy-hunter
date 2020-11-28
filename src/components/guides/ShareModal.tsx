import React, { FC, useState } from 'react';
import SmallModal from '../modals/SmallModal';
import styled from '@emotion/styled';
import Button from '../common/Button';
import { copyTextToClipboard } from '../../api/utils/clipboard';

const CopyContainer = styled.div`
  margin-top: 20px;
  display: flex;
  background: #3f3e43;

  a {
    margin: 8px;
    flex-grow: 1;
    color: #eaeaea;
  }

  ${Button} {
    margin: 0;
    padding: 8px 16px;
  }
`;

const WideSmallModal = styled(SmallModal)`
  padding: 15px;
  min-width: 300px;
`;

interface ShareModalProps {
  onClose(): void;
}

const URL = 'https://th.gl';
const ShareModal: FC<ShareModalProps> = ({ onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    if (copyTextToClipboard(URL)) {
      setCopied(true);
    }
  };

  return (
    <WideSmallModal
      onClose={onClose}
      title="Spread the love <3"
      targetId="share"
    >
      <p>Let your friends join the fun as well!</p>
      <CopyContainer>
        <a href={URL} target="_blank" rel="noreferrer">
          {URL}
        </a>
        <Button onClick={handleClick}>{copied ? 'Copied!' : 'Copy'}</Button>
      </CopyContainer>
    </WideSmallModal>
  );
};

export default ShareModal;
