import React, { FC, ReactElement } from 'react';
import { Tooltip } from '../tooltip';
import { Level } from './types';
import styled from '@emotion/styled';
import { useAccount } from '../../contexts/account';
import { categoriesMap } from '../trophies/categories';

interface MarkerTooltipProps {
  children: ReactElement;
  level: Level;
}

const Trophies = styled.div`
  display: flex;
  margin-top: 6px;
  > svg {
    margin-right: 4px;
    height: 30px;
  }
`;

const MarkerTooltip: FC<MarkerTooltipProps> = ({ children, level }) => {
  const { account } = useAccount();

  const trophies = level.trophies.map((trophy) => {
    const accountTrophy = account?.trophies.find(
      (accountTrophy) => accountTrophy.name === trophy.name
    );
    const progress =
      accountTrophy?.status === 'completed' ? 1 : accountTrophy?.progress || 0;
    const ProgressIcon = categoriesMap[trophy.category].Icon;

    return <ProgressIcon key={trophy.name} progress={progress} />;
  });

  return (
    <Tooltip
      text={
        <>
          <h5>{level.title}</h5>
          <Trophies>{trophies}</Trophies>
        </>
      }
      placement="bottom"
    >
      {children}
    </Tooltip>
  );
};

export default MarkerTooltip;
