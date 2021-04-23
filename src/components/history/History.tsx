import styled from '@emotion/styled';
import React from 'react';
import { useQuery } from 'react-query';
import Match from './Match';
import { getHistoryMatches, HistoryMatch } from '../../api/matches';
import Squid from '../icons/Squid';
import { trackLink } from '../../api/performance';
import { GameChildProps } from '../../layouts/GameLayout';

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

const History = ({ account }: GameChildProps) => {
  const { data: matches = Array<HistoryMatch>(20).fill(null) } = useQuery(
    ['matches', account?._id],
    () =>
      getHistoryMatches({
        summonerName: account.summoner.name,
        platformId: account.summoner.platformId,
      }),
    {
      enabled: !!account,
    }
  );

  return (
    <Container>
      <h3>Showing last 20 matches</h3>
      {matches.length > 0 && (
        <Matches>
          {matches.map((match, index) => (
            <Match key={match?.gameId || index} match={match} />
          ))}
        </Matches>
      )}
      {matches.length === 0 && (
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
              onClick={() => trackLink('https://discord.gg/NTZu8Px')}
            >
              Discord
            </a>{' '}
            for further assistance.
          </div>
        </NoMatches>
      )}
    </Container>
  );
};

export default History;
