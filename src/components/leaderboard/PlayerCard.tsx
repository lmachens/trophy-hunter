import styled from '@emotion/styled';
import React from 'react';
import { useQuery } from 'react-query';
import { getRecentVersion } from '../../api/riot';
import IslandIcons from './IslandIcons';
import { css, keyframes } from '@emotion/react';
import { Ranking } from '../../api/accounts';

type Loadable = {
  isLoading: boolean;
};

const waveLines = keyframes`
    0% {
        background-position: -468px 0;
    }
     100% {
        background-position: 468px 0;
    }
`;
const loadingStyle = css`
  background: linear-gradient(
    to right,
    rgba(130, 130, 130, 0.2) 8%,
    rgba(130, 130, 130, 0.3) 18%,
    rgba(130, 130, 130, 0.2) 33%
  );
  background-size: 800px 100px;
  min-height: 19px;
  animation: ${waveLines} 2s infinite ease-out;
  border: none;
`;

const Rank = styled.div`
  grid-area: rank;
`;

const Avatar = styled.img<Loadable>`
  grid-area: avatar;
  height: auto;
  width: auto;
  object-fit: contain;
  ${(props) => props.isLoading && loadingStyle}
`;

const SummonerName = styled.div<Loadable>`
  min-width: 100px;
  grid-area: summoner-name;
  color: #77777a;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  ${(props) => props.isLoading && loadingStyle}
  ${(props) => props.isLoading && 'max-width: 70%;'}
`;

const TrophiesCount = styled.div<Loadable>`
  grid-area: trophies-count;
  ${(props) => props.isLoading && loadingStyle}
  ${(props) => props.isLoading && 'max-width: 90%;'}
`;

const Islands = styled.div`
  grid-area: islands;
  color: #77777a;
  font-size: 16px;
`;

const IslandsUnlocked = styled(IslandIcons)`
  grid-area: islands-unlocked;
`;

type CardProps = {
  size: 'L' | 'M' | 'S';
};

const sizes = {
  L: css`
    column-gap: 15px;

    padding: 25px;
    grid-template-areas:
      'rank avatar summoner-name'
      'rank avatar trophies-count'
      'rank avatar islands-unlocked';
    grid-template-columns: auto auto 1fr;
    flex: 2.3;
    min-width: 350px;

    ${Rank} {
      font-size: 28px;
    }

    ${Avatar} {
      height: 121px;
      width: 121px;
    }

    ${TrophiesCount} {
      font-size: 18px;
    }
  `,
  M: css`
    column-gap: 10px;

    grid-template-areas:
      'rank avatar summoner-name islands'
      'rank avatar trophies-count islands-unlocked';
    grid-template-columns: auto auto 1fr 1fr;
    flex: 3;
    ${Rank} {
      font-size: 18px;
      color: #77777a;
    }

    ${Avatar} {
      height: 50px;
      width: 50px;
    }

    ${TrophiesCount} {
      font-size: 18px;
    }
  `,
  S: css`
    column-gap: 10px;

    padding: 20px 16px;

    grid-template-areas: 'rank avatar summoner-name trophies-count islands islands-unlocked';
    grid-template-columns: auto auto 1fr 1fr 1fr 1fr;

    ${SummonerName} {
      color: inherit;
    }

    ${Rank} {
      font-size: 18px;
      color: #77777a;
    }

    ${Avatar} {
      height: 50px;
      width: 50px;
    }

    ${TrophiesCount}, ${Islands} {
      border-left: 1px solid #616165;
      align-self: stretch;
      display: flex;
      align-items: center;
      padding-left: 16px;
    }

    ${TrophiesCount} span {
      color: #77777a;
      margin-left: 0.5em;
    }
  `,
};

export const Card = styled.div<CardProps>`
  background: #3f3e43;
  display: grid;
  font-size: 16px;
  align-items: center;
  row-gap: 6px;

  ${(props) => sizes[props.size]};
`;

type Props = {
  size: 'L' | 'M' | 'S';
  rank: number;
  ranking: Ranking;
};
const PlayerCard = ({ size, rank, ranking }: Props) => {
  const { data: version } = useQuery('version', getRecentVersion);

  return (
    <Card size={size}>
      <Rank>#{rank}</Rank>
      <Avatar
        isLoading={!ranking}
        src={
          version && ranking?.profileIconId
            ? `https://ddragon.leagueoflegends.com/cdn/${version.riot}/img/profileicon/${ranking?.profileIconId}.png`
            : "data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E"
        }
        alt=""
      />
      <SummonerName isLoading={!ranking}>{ranking?.summonerName}</SummonerName>
      {(size !== 'S' || ranking?.trophiesCompleted) && (
        <TrophiesCount isLoading={!ranking}>
          {ranking?.trophiesCompleted && (
            <>
              {ranking?.trophiesCompleted} <span>Trophies</span>
            </>
          )}
        </TrophiesCount>
      )}
      {size !== 'L' && (size !== 'S' || ranking) && (
        <Islands>{ranking?.islands.length > 0 && 'Unlocked'}</Islands>
      )}
      <IslandsUnlocked islands={ranking?.islands || []} />
    </Card>
  );
};

export default PlayerCard;
