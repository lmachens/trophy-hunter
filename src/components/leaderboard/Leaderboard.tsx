import styled from '@emotion/styled';
import React from 'react';
import Button from '../common/Button';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useInfiniteQuery } from 'react-query';
import { getRankings, Ranking } from '../../api/accounts';
import PlayerCard from './PlayerCard';
import useVersion from '../../hooks/useVersion';
import { normalizeQuery } from '../../api/utils/router';
import SummonerSearch from './SummonerSearch';

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
  display: grid;
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

    > * + * {
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
  flex: 3;
`;

const Leaderboard = () => {
  const router = useRouter();
  const { season: currentSeason } = useVersion();

  const { season = currentSeason } = normalizeQuery(router.query);
  const activeSeason = typeof season === 'string' ? season : null;
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery(
      ['season', activeSeason],
      ({ pageParam = 0 }) =>
        getRankings({
          season: activeSeason,
          page: pageParam,
        }),
      {
        getNextPageParam: (result) =>
          result.hasMore ? result.currentPage + 1 : null,
      }
    );

  const [first, second, third] = data?.pages[0]?.data || [];
  const seasons = ['10', '11'];
  return (
    <Container>
      <nav>
        <SummonerSearch season={season} />
        {seasons.map((season) => (
          <Link
            key={season}
            href={{
              query: {
                ...router.query,
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
      </nav>
      <TopPlayers>
        <PlayerCard size="L" rank={1} ranking={first} />
        <NotFirst>
          <PlayerCard size="M" rank={2} ranking={second} />
          <PlayerCard size="M" rank={3} ranking={third} />
        </NotFirst>
      </TopPlayers>
      <MorePlayers>
        {status === 'success' && (
          <>
            {data.pages.length > 0 && (
              <>
                {data.pages.map((result, i) => (
                  <React.Fragment key={i}>
                    {result.data.map((ranking, index) => {
                      const rank = i * result.limit + index + 1;
                      if (rank <= 3) {
                        return <React.Fragment key={rank} />;
                      }
                      return (
                        <PlayerCard
                          key={ranking?.summonerName || rank}
                          size="S"
                          rank={rank}
                          ranking={ranking}
                        />
                      );
                    })}
                  </React.Fragment>
                ))}
                <Button
                  onClick={() => fetchNextPage()}
                  disabled={!hasNextPage || isFetchingNextPage}
                >
                  {isFetchingNextPage
                    ? 'Loading more...'
                    : hasNextPage
                    ? 'Load More'
                    : 'Nothing more to load'}
                </Button>
              </>
            )}
          </>
        )}
        {status === 'loading' &&
          Array<Ranking>(10)
            .fill(null)
            .map((ranking, index) => (
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
