import React, { useEffect, useRef, useState } from 'react';
import { Ranking, rankingBySummonerName } from '../../api/accounts';
import PlayerCard from './PlayerCard';
import styled from '@emotion/styled';
import useOutsideClick from '../../hooks/useOutsideClick';

const Container = styled.section`
  position: relative;

  input {
    color: #eaeaea;
    background: #3f3e43;
    padding: 10px 8px;
    border: none;

    ::placeholder {
      color: #77777a;
    }
  }
`;
const Result = styled.div`
  width: 780px;
  position: absolute;
  display: grid;
  top: calc(100% + 10px);
  left: 0;
  row-gap: 10px;
  background: #2b2a30;
  padding: 20px;
  border: 1px solid #eaeaea;
`;

type SummonerSearchType = {
  season: string;
};
const SummonerSearch = ({ season }: SummonerSearchType): JSX.Element => {
  const resultRef = useRef<HTMLDivElement>(null);

  const [summonerName, setSummonerName] = useState('');
  const [rankings, setRankings] = useState<Ranking[]>([]);
  useOutsideClick(resultRef, () => setSummonerName(''));

  useEffect(() => {
    if (!summonerName) {
      setRankings([]);
      return;
    }
    const timeoutId = setTimeout(() => {
      rankingBySummonerName({ season, summonerName }).then(setRankings);
    }, 200);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [summonerName]);

  return (
    <Container>
      <input
        type="text"
        value={summonerName}
        onChange={(event) => setSummonerName(event.target.value)}
        placeholder="Search summoner"
      />
      {rankings.length > 0 && (
        <Result ref={resultRef}>
          {rankings.map((ranking) => (
            <PlayerCard
              key={`${ranking.summonerName}-${ranking.platformId}`}
              size="S"
              ranking={ranking}
            />
          ))}
        </Result>
      )}
    </Container>
  );
};

export default SummonerSearch;
