import styled from '@emotion/styled';
import React from 'react';
import * as combatTrophies from '../trophies/combat';
import * as epicTrophies from '../trophies/epic';
import * as hubTrophies from '../trophies/hub';
import * as objectivesTrophies from '../trophies/objectives';
import * as skillsTrophies from '../trophies/skills';
import * as specialTrophies from '../trophies/special';
import * as teamworkTrophies from '../trophies/teamwork';
import * as trophies from '../trophies';
import TrophyProgress from './TrophyProgress';
import { GameChildProps } from '../../layouts/GameLayout';

const progressList = [
  {
    title: 'Origin',
    category: 'hub',
    trophiesMax: Object.keys(hubTrophies).length,
  },
  {
    title: 'Combat',
    category: 'combat',
    trophiesMax: Object.keys(combatTrophies).length,
  },
  {
    title: 'Skills',
    category: 'skills',
    trophiesMax: Object.keys(skillsTrophies).length,
  },
  {
    title: 'Teamwork',
    category: 'teamwork',
    trophiesMax: Object.keys(teamworkTrophies).length,
  },
  {
    title: 'Objectives',
    category: 'objectives',
    trophiesMax: Object.keys(objectivesTrophies).length,
  },
  {
    title: 'Epic',
    category: 'epic',
    trophiesMax: Object.keys(epicTrophies).length,
  },
  {
    title: 'Special',
    category: 'special',
    trophiesMax: Object.keys(specialTrophies).length,
  },
];

const Container = styled.div`
  h3 {
    text-transform: uppercase;
    margin-top: 0;
    font-size: 18px;
  }
`;

const Summary = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 7px;
  row-gap: 5px;
`;

const ProgressContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  background: #2b2a30;
  padding: 10px;
  font-size: 16px;
  font-family: 'Roboto Mono', monospace;
  align-items: center;
  column-gap: 10px;

  span {
    color: #77777a;
  }
`;

const HistoryOverview = ({ account }: GameChildProps) => {
  const completedTrophies =
    account?.trophies.filter((accountTrophy) => accountTrophy.progress === 1) ||
    [];

  return (
    <Container>
      <h3>Total trophies unlocked</h3>
      <Summary>
        {progressList.map((item) => (
          <ProgressContainer key={item.category}>
            <TrophyProgress category={item.category} progress={100} max={100} />
            <div>{item.title}</div>
            <div>
              {
                completedTrophies.filter(
                  (accountTrophy) =>
                    trophies[accountTrophy.name].category === item.category
                ).length
              }
              /<span>{item.trophiesMax}</span>
            </div>
          </ProgressContainer>
        ))}
      </Summary>
    </Container>
  );
};

export default HistoryOverview;
