import { NextPage } from 'next';
import Router from 'next/router';
import LeagueOfLegends from './league-of-legends';
import { useEffect } from 'react';

const Index: NextPage = () => {
  useEffect(() => {
    Router.replace('/league-of-legends');
  });

  return <LeagueOfLegends />;
};

export default Index;
