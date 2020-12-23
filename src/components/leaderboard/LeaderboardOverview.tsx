import styled from '@emotion/styled';
import React, { useMemo } from 'react';
import { useAccount } from '../../contexts/account';
import ProgressBar from '../common/ProgressBar';
import IslandIcons from './IslandIcons';
import * as trophies from '../trophies';

const Container = styled.div`
  flex-grow: 1;
  background: #2b2a30;
  padding: 15px;

  > * + * {
    margin-top: 20px;
  }

  h3 {
    text-transform: uppercase;
    margin-top: 0;
    font-size: 18px;
  }

  h4,
  label {
    display: block;
    font-family: Roboto Mono;
    font-size: 15px;
    color: #77777a;

    > * {
      margin-top: 4px;
    }
  }
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;

  > div {
    margin-top: 4px;
  }
`;

const IslandsCompleted = styled(IslandIcons)`
  svg {
    height: 40px;
    width: 40px;
  }
`;

const numberOfTrophies = Object.keys(trophies).length;

const LeaderboardOverview = () => {
  const { account } = useAccount();
  const trophiesCount = useMemo(() => account?.trophiesCompleted || 0, [
    account,
  ]);
  const islandsCompleted = useMemo(
    () =>
      account?.islands
        .filter((island) => island.status === 'done')
        .map((island) => island.name) || [],
    [account]
  );

  return (
    <Container>
      <h3>Season 10</h3>
      <Stats>
        <h4>Your Place</h4>
        <h4>Trophies</h4>
        <h4>Trophies left</h4>
        <div>#{account?.rank}</div>
        <div>{trophiesCount}</div>
        <div>{numberOfTrophies - trophiesCount}</div>
      </Stats>
      <label>
        Trophies completion
        <ProgressBar
          progress={trophiesCount / numberOfTrophies}
          max={numberOfTrophies}
          category="special"
          percentage
        />
      </label>
      <label>
        Islands completed
        <IslandsCompleted islands={islandsCompleted} />
      </label>
    </Container>
  );
};

export default LeaderboardOverview;
