import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';

const darkBinding: Trophy = {
  island: 'combatIsland',
  name: 'darkBinding',
  level: 'combat7',
  title: 'Dark Binding',
  description:
    'CC enemy champions for at least 100 seconds (soft cc counts for 1/2, slows count for 1/6 of their duration).',
  category: 'combat',
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);

    return participant.stats.timeCCingOthers / 100;
  },
};

export default darkBinding;
