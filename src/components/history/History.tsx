import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import Match from './Match';
import { getHistoryMatches, HistoryMatch } from '../../api/matches';
import Squid from '../icons/Squid';
import { useAccount } from '../../contexts/account';
import Button from '../common/Button';
import Toggle from '../common/Toggle';

const Container = styled.div`
  font-family: Roboto Mono;
  margin-top: 48px;
  padding: 15px;
  flex-grow: 1;
  display: grid;
  grid-template-rows: auto 1fr;
  row-gap: 15px;

  > h3 {
    text-transform: uppercase;
    margin: 0;
    font-size: 18px;
  }
`;

const Matches = styled.div`
  overflow-y: scroll;
  padding-right: 8px;
  display: grid;
  row-gap: 6px;
  align-content: baseline;
`;

const NoMatches = styled.div`
  align-self: center;
  text-align: center;

  p {
    margin-top: 20px;
    font-size: 18px;
    text-transform: uppercase;
  }
  div {
    margin-top: 10px;
    font-size: 13px;
  }
`;

const Label = styled.label`
  margin: 8px 0px;
  font-family: 'Lato', sans-serif;
  justify-self: start;

  > * {
    margin-left: 12px;
  }
`;

const History = () => {
  const [onlyWithTrophies, setOnlyWithTrophies] = useState<boolean>(false);

  const { account } = useAccount();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery(
      ['matches', account?._id, onlyWithTrophies],
      ({ pageParam = 0 }) =>
        getHistoryMatches({
          summonerName: account.summoner.name,
          platformId: account.summoner.platformId,
          onlyWithTrophies,
          page: pageParam,
        }),
      {
        enabled: !!account,
        getNextPageParam: (result) =>
          result.hasMore ? result.currentPage + 1 : null,
      }
    );

  return (
    <Container>
      <Label>
        Only with trophies
        <Toggle
          checked={onlyWithTrophies}
          onChange={() => setOnlyWithTrophies(!onlyWithTrophies)}
        />
      </Label>
      <Matches>
        {status === 'success' && (
          <>
            {data.pages.length > 0 && (
              <>
                {data.pages.map((result, i) => (
                  <React.Fragment key={i}>
                    {result.data.map((match, index) => (
                      <Match key={match?.gameId || index} match={match} />
                    ))}
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
            {!data.pages[0] && (
              <NoMatches>
                <Squid />
                <p>No matches found</p>
                <div>
                  Matches are automatically recorded.
                  <br />
                  Please contact us on{' '}
                  <a
                    href="https://discord.gg/NTZu8Px"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Discord
                  </a>{' '}
                  for further assistance.
                </div>
              </NoMatches>
            )}
          </>
        )}
        {status === 'loading' &&
          Array<HistoryMatch>(10)
            .fill(null)
            .map((match, index) => <Match key={index} match={match} />)}
      </Matches>
    </Container>
  );
};

export default History;
