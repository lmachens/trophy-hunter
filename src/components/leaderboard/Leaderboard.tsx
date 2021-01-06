import styled from '@emotion/styled';
import React from 'react';
import Button from '../common/Button';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useQuery } from 'react-query';
import { getRankings, Ranking } from '../../api/accounts';
import PlayerCard, { Card } from './PlayerCard';
import useVersion from '../../hooks/useVersion';
import { Tooltip } from '../tooltip';

const TopPlayers = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -12px;
  margin-top: -12px;

  > * {
    margin-top: 12px;
    margin-left: 12px;
  }
`;
const MorePlayers = styled.div`
  overflow-y: scroll;
  > * + * {
    margin-top: 6px;
  }
`;

const Container = styled.div`
  font-family: Roboto Mono;
  margin-top: 48px;
  padding: 15px;
  flex-grow: 1;
  display: grid;
  grid-template-rows: auto auto 1fr;

  nav {
    display: flex;
    flex-basis: 100%;
    margin-bottom: 15px;

    * + * {
      margin-left: 15px;
    }
  }

  ${MorePlayers} {
    margin-top: 12px;
    padding-right: 8px;
  }
`;

const NotFirst = styled.div`
  background: #3f3e43;
  padding: 25px 12px;
  flex: 3;

  ${Card} + ${Card} {
    margin-top: 20px;
  }
`;

const Leaderboard = () => {
  const router = useRouter();
  const { season: currentSeason } = useVersion();

  const { season = currentSeason } = router.query;
  const activeSeason = typeof season === 'string' ? season : null;
  const { data = Array<Ranking>(50).fill(null) } = useQuery(
    `season-${season}`,
    () => getRankings(activeSeason)
  );

  const [first, second, third, ...rest] = data;
  const seasons = ['10'];
  if (currentSeason === '11') {
    seasons.push('11');
  }
  return (
    <Container>
      <nav>
        {seasons.map((season) => (
          <Link
            key={season}
            href={{
              query: {
                subpage: 'leaderboard',
                season,
              },
            }}
            passHref
          >
            <Button as="a" active={activeSeason === season}>
              Season {season}
            </Button>
          </Link>
        ))}
        {currentSeason !== '11' && (
          <Tooltip text="Next season starts January 8" placement="top">
            <Button off>Season 11</Button>
          </Tooltip>
        )}
      </nav>
      <TopPlayers>
        <PlayerCard size="L" rank={1} ranking={first} />
        <NotFirst>
          <PlayerCard size="M" rank={2} ranking={second} />
          <PlayerCard size="M" rank={3} ranking={third} />
        </NotFirst>
      </TopPlayers>
      <MorePlayers>
        {rest.map((ranking, index) => (
          <PlayerCard
            key={ranking?.summonerName || index}
            size="S"
            rank={index + 4}
            ranking={ranking}
          />
        ))}
      </MorePlayers>
    </Container>
  );
};

export default Leaderboard;
