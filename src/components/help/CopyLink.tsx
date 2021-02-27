import React, { useState } from 'react';
import styled from '@emotion/styled';
import { copyTextToClipboard } from '../../api/utils/clipboard';
import { trackCopyLink } from '../../api/performance';
import FancyButton from '../common/FancyButton';

const CopyContainer = styled.div`
  min-width: 270px;
  margin-top: 20px;
  display: flex;
  background: #3f3e43;

  a {
    margin: 8px;
    flex-grow: 1;
    color: #eaeaea;
  }

  ${FancyButton} {
    margin: 0;
    padding: 8px 16px;
  }
`;

const URL = 'https://th.gl';
const CopyLink = () => {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    trackCopyLink();
    if (copyTextToClipboard(URL)) {
      setCopied(true);
    }
  };

  return (
    <CopyContainer>
      <a href={URL} target="_blank" rel="noreferrer">
        {URL}
      </a>
      <FancyButton onClick={handleClick}>
        {copied ? 'Copied!' : 'Copy'}
      </FancyButton>
    </CopyContainer>
  );
};

export default CopyLink;
