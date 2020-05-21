import { FC } from 'react';
import styled from '@emotion/styled';
import ChooseALevel from './ChooseALevel';
import DetailsToggle from './DetailsToggle';
import { Level } from './types';
import TrophyListItem from '../trophies/TrophyListItem';
import { useMutation, queryCache } from 'react-query';
import { postUnlock } from '../../api/accounts';
import DevButton from '../common/DevButton';
import { useAccount } from '../../contexts/account';

type Open = { open: boolean };

const Container = styled.aside<Open>`
  padding-top: 48px;
  border-left: 1px solid #eaeaea;
  position: relative;
  background: #2b2a30;
  width: ${(props) => (props.open ? '350px' : '0px')};
  transition: 0.15s;
`;

const Content = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
`;

const List = styled.div`
  flex-grow: 1;
  overflow: auto;
  margin-bottom: 20px;
  width: 100%;
`;

const Title = styled.h3`
  margin-bottom: 12px;
`;

interface LevelPanelProps {
  level?: Level;
  onToggleClick(): void;
  open: boolean;
}

const LevelPanel: FC<LevelPanelProps> = ({ level, open, onToggleClick }) => {
  const { account } = useAccount();

  const [unlock] = useMutation(postUnlock, {
    onSuccess: () => {
      queryCache.refetchQueries('account');
    },
  });

  let content;
  if (open && !level) {
    content = <ChooseALevel />;
  } else if (level) {
    content = (
      <>
        <level.Icon />
        <Title>{level.title}</Title>
        <DevButton
          onClick={() => unlock(level.name)}
          disabled={
            !(
              account?.levels.find(
                (accountLevel) => accountLevel.name === level.name
              )?.status === 'active'
            )
          }
        >
          Unlock
        </DevButton>
        <List>
          {level.trophies.map((trophy) => (
            <TrophyListItem
              key={trophy.name}
              trophy={trophy}
              data-tooltip-id={trophy.name}
            />
          ))}
        </List>
      </>
    );
  }

  return (
    <Container open={open}>
      <DetailsToggle open={open} onClick={onToggleClick} />
      <Content>{content}</Content>
    </Container>
  );
};

export default LevelPanel;
