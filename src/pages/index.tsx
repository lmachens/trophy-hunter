import { NextPage } from 'next';
import Router from 'next/router';
import { useEffect } from 'react';

const Index: NextPage = () => {
  useEffect(() => {
    Router.replace('/league-of-legends?subpage=map');
  });

  return null;
};

export default Index;
