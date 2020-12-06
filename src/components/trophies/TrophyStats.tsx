import styled from '@emotion/styled';
import React from 'react';
import { useQuery } from 'react-query';
import { getStats } from '../../api/stats';
import { Tooltip } from '../tooltip';

const Container = styled.span`
  font-family: 'Roboto Mono', monospace;

  span {
    color: #77777a;
  }
`;

type Props = {
  trophyName: string;
};
const TrophyStats = ({ trophyName }: Props) => {
  const { data: stats = {} } = useQuery('stats', getStats);

  const trophyStats = stats[trophyName] || { total: 0, completed: 0 };

  return (
    <Tooltip
      placement="bottomRight"
      text={`${trophyStats.completed} users out of ${trophyStats.total} completed this trophy`}
    >
      <Container>
        ({trophyStats.completed}/<span>{trophyStats.total})</span>
      </Container>
    </Tooltip>
  );
};

export default TrophyStats;
