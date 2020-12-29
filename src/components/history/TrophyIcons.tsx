import styled from '@emotion/styled';
import React, { useMemo } from 'react';
import * as trophies from '../trophies';
import { Category, Trophy } from '../trophies/types';
import TrophyProgress from './TrophyProgress';

const Container = styled.div`
  display: grid;
  column-gap: 8px;
  grid-auto-flow: column;
  justify-content: start;
`;

const categoryOrder: Category[] = [
  'hub',
  'combat',
  'skills',
  'teamwork',
  'objectives',
  'epic',
  'special',
];

type Props = {
  trophyNames: string[];
};

const TrophyIcons = ({ trophyNames }: Props) => {
  const localTrophies = useMemo(
    () =>
      trophyNames
        .map<Trophy>((trophyName) => trophies[trophyName])
        .filter((trophy) => trophy)
        .sort(
          (a, b) =>
            categoryOrder.indexOf(a.category) -
            categoryOrder.indexOf(b.category)
        ),
    [trophyNames]
  );

  return (
    <Container>
      {localTrophies.map((trophy) => (
        <TrophyProgress
          key={trophy.name}
          category={trophy.category}
          progress={100}
          max={100}
        />
      ))}
    </Container>
  );
};

export default TrophyIcons;
