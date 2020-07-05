import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';

const controller: Trophy = {
  island: 'teamworkIsland',
  name: 'controller',
  level: 'teamwork2',
  title: 'Controller',
  description: 'Place at least 6 control wards.',
  category: 'teamwork',
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);

    return participant.stats.visionWardsBoughtInGame / 6;
  },
};

export default controller;
