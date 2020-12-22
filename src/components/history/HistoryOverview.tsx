import styled from '@emotion/styled';
import React from 'react';
import { GameChildProps } from '../../layouts/GameLayout';

const Container = styled.div`
  flex-grow: 1;
`;

const HistoryOverview = ({ onQueryChange }: GameChildProps) => {
  return <Container>History Overview</Container>;
};

export default HistoryOverview;
