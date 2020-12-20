import styled from '@emotion/styled';
import React from 'react';
import { useQuery } from 'react-query';
import { getRecentVersion } from '../../api/riot';
import IslandIcons from './IslandIcons';
import { css } from '@emotion/react';
import { Ranking } from '../../api/accounts';

const Rank = styled.div`
  grid-area: rank;
`;

const Avatar = styled.img`
  grid-area: avatar;
  height: auto;
  width: auto;
  object-fit: contain;
`;

const SummonerName = styled.div`
  grid-area: summoner-name;
  color: #77777a;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const TrophiesCount = styled.div`
  grid-area: trophies-count;
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
    padding: 20px;
    grid-template-areas:
      'rank avatar summoner-name'
      'rank avatar trophies-count'
      'rank avatar islands-unlocked';
    grid-template-columns: auto auto 1fr;
    flex: 1;
    min-width: 350px;

    ${Rank} {
      font-size: 34px;
    }

    ${Avatar} {
      height: 118px;
    }

    ${TrophiesCount} {
      font-size: 18px;
    }

    > * + * {
      margin-left: 15px;
    }
  `,
  M: css`
    grid-template-areas:
      'rank avatar summoner-name islands'
      'rank avatar trophies-count islands-unlocked';
    grid-template-columns: auto auto 1fr 1fr;
    flex: 1.5;
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

    > * + * {
      margin-left: 10px;
    }
  `,
  S: css`
    padding: 20px 16px;

    grid-template-areas: 'rank avatar summoner-name trophies-count islands islands-unlocked';
    grid-template-columns: auto auto 1fr 1fr 1fr 1fr;

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

    > * + * {
      margin-left: 10px;
    }
  `,
};

export const Card = styled.div<CardProps>`
  background: #3f3e43;
  display: grid;
  font-size: 16px;
  align-items: center;

  ${(props) => sizes[props.size]};
`;

const emptyRanking: Ranking = {
  profileIconId: null,
  summonerName: null,
  islands: [],
  completed: null,
};
type Props = {
  size: 'L' | 'M' | 'S';
  rank: number;
  ranking: Ranking;
};
const PlayerCard = ({ size, rank, ranking = emptyRanking }: Props) => {
  const { data: version } = useQuery('version', getRecentVersion);

  return (
    <Card size={size}>
      <Rank>#{rank}</Rank>
      <Avatar
        src={
          version &&
          `https://ddragon.leagueoflegends.com/cdn/${version.riot}/img/profileicon/${ranking.profileIconId}.png`
        }
        alt=""
      />
      <SummonerName>{ranking.summonerName}</SummonerName>
      <TrophiesCount>
        {ranking.completed} <span>Trophies</span>
      </TrophiesCount>
      {size !== 'L' && <Islands>Unlocked</Islands>}
      <IslandsUnlocked islands={ranking.islands} />
    </Card>
  );
};

export default PlayerCard;
