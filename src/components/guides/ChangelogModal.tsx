import React, { FC, useEffect, useState } from 'react';
import Modal from '../modals/Modal';
import ReactMarkdown from 'react-markdown';
import useVersion from '../../hooks/useVersion';
import styled from '@emotion/styled';
import usePersistentState from '../../hooks/usePersistentState';
import { trackSettingsChanged } from '../../api/performance';

const Releases = styled.section`
  hr {
    border-color: rgba(234, 234, 234, 0.2);
  }

  h2 {
    margin: 8px 0px 4px 0px;
  }

  aside {
    margin-bottom: 4px;
  }
`;

interface ChangelogModalProps {
  onClose(): void;
}

const ChangelogModal: FC<ChangelogModalProps> = ({ onClose }) => {
  const [releases, setReleases] = useState(null);
  const [changelogUpdates, setChangelogUpdates] = usePersistentState(
    'changelogUpdates',
    true
  );

  const version = useVersion();

  useEffect(() => {
    fetch('https://api.github.com/repos/lmachens/trophy-hunter/releases')
      .then((response) => response.json())
      .then((releases) => releases.filter((release) => !release.prerelease))
      .then(setReleases);
  }, []);

  return (
    <Modal
      onClose={onClose}
      title="Changelog"
      onShowAgainChange={(showAgain) => {
        setChangelogUpdates(showAgain);
        trackSettingsChanged(
          `Changelog Updates (Modal) [${showAgain ? 'checked' : 'unchecked'}]`
        );
      }}
      showAgain={changelogUpdates}
    >
      <p>Your version: {version}</p>
      <Releases>
        {releases?.map((release) => (
          <React.Fragment key={release.id}>
            <hr />
            <h2>{release.name}</h2>
            <aside>{new Date(release.published_at).toLocaleDateString()}</aside>
            {release.body ? (
              <ReactMarkdown>{release.body}</ReactMarkdown>
            ) : (
              <p>No details 😞</p>
            )}
          </React.Fragment>
        ))}
      </Releases>
    </Modal>
  );
};

export default ChangelogModal;
