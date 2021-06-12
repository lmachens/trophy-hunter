import { Trophy } from '../types';

const controller: Trophy = {
  island: 'teamwork',
  name: 'controller',
  level: 'teamwork2',
  title: 'Controller',
  description: 'Place at least 6 control wards.',
  category: 'teamwork',
  checkProgress: ({ participant }) => {
    return participant.visionWardsBoughtInGame / 6;
  },
};

export default controller;
