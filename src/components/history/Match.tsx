import styled from '@emotion/styled';
import React, { useState } from 'react';
import { HistoryMatch } from '../../api/matches';
import { loadingStyle } from '../../styles/animations';
import { queues } from '../../api/overwolf';
import TrophyIcons from './TrophyIcons';
import ArrowLeft from '../icons/ArrowLeft';
import ArrowRight from '../icons/ArrowRight';
import TrophyListItem from '../trophies/TrophyListItem';
import TrophyList from '../trophies/TrophyList';
import * as trophies from '../trophies';
import { useAccount } from '../../contexts/account';
import { apiEndoint } from '../../api/utils/runtime';

type Props = {
  match?: HistoryMatch;
};

type Loadable = {
  isLoading: boolean;
};

const Container = styled.div`
  position: relative;
  background: #3f3e43;
  display: grid;
  grid-template-columns: auto auto auto 1fr;
  column-gap: 10px;
  font-size: 16px;
  align-items: center;
  row-gap: 6px;
  padding: 16px;

  > div {
    display: grid;
    row-gap: 5px;
  }
  > div:nth-of-type(1),
  > div:nth-of-type(2) {
    border-right: 1px solid #616165;
    padding-right: 30px;
    margin-right: 20px;
    min-width: 120px;
  }

  div {
    min-height: 20px;
  }

  svg {
    height: 20px;
    width: auto;
  }
`;

const Champion = styled.img<Loadable>`
  height: 50px;
  width: 50px;
  object-fit: contain;
  ${(props) => props.isLoading && loadingStyle}
`;

const GameDate = styled.div<Loadable>`
  min-width: 100px;
  ${(props) => props.isLoading && loadingStyle}
  ${(props) => props.isLoading && 'max-width: 100%;'}
`;

const GameDuration = styled.div<Loadable>`
  color: #77777a;
  min-width: 70px;
  ${(props) => props.isLoading && loadingStyle}
  ${(props) => props.isLoading && 'max-width: 70%;'}
`;

const Outcome = styled.div<{ win: boolean }>`
  color: ${(props) => (props.win ? '#5AFF6B' : '#FF4040')};
`;

const Queue = styled.div`
  color: #77777a;
`;

const MoreButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  width: 30px;
  height: 82px;
  background: #555559;
  outline: none;
  border: none;
  color: #838386;
  cursor: pointer;

  :hover {
    background: #77777a;
  }

  svg {
    position: absolute;
    bottom: 10px;
    left: 12px;
    height: 12px;
    transform: rotate(-90deg);
  }
`;

const Details = styled(TrophyList)`
  margin-top: 9px;
  padding-top: 19px;
  grid-column: 1 / 5;
  font-size: 14px;
  max-height: 330px;
  overflow-y: auto;
  border-top: 1px solid #616165;
`;
const ListItem = styled(TrophyListItem)`
  &:hover {
    background-color: #2b2a30;
  }
`;

const Match = ({ match }: Props) => {
  const { account } = useAccount();
  const [open, setOpen] = useState(false);

  return (
    <Container>
      <Champion
        isLoading={!match}
        src={
          match?.championId
            ? `${apiEndoint}/api/champions/${match.championId}/img`
            : "data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E"
        }
        alt=""
      />
      <div>
        <GameDate isLoading={!match}>
          {match?.gameCreatedAt.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
          })}
        </GameDate>
        <GameDuration isLoading={!match}>
          {match && `${Math.floor(match.gameDuration / 60)}m`}{' '}
          {match && `${match.gameDuration % 60}s`}
        </GameDuration>
      </div>
      {match && (
        <div>
          <Outcome win={match.win}>{match.win ? 'Victory' : 'Defeat'}</Outcome>
          <Queue>{queues[match.queueId]}</Queue>
        </div>
      )}
      {match && (
        <div>
          <div>{match.trophyNames.length} Trophies</div>
          <TrophyIcons trophyNames={match.trophyNames} />
        </div>
      )}
      {match?.trophyNames.length > 0 && (
        <MoreButton onClick={() => setOpen(!open)}>
          {open ? <ArrowRight /> : <ArrowLeft />}
        </MoreButton>
      )}
      {open && match && (
        <Details>
          {match.trophyNames.map((trophyName) => (
            <ListItem
              account={account}
              trophy={trophies[trophyName]}
              key={trophyName}
            />
          ))}
        </Details>
      )}
    </Container>
  );
};

export default Match;
