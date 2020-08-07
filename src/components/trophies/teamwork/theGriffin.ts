import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';

const theGriffin: Trophy = {
  island: 'teamworkIsland',
  name: 'theGriffin',
  level: 'teamwork1',
  title: 'The Griffin',
  description: 'Have highest kill participation of your team.',
  category: 'teamwork',
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);

    const maxKillParticipation = Math.max(
      ...match.participants.map(
        (participant) => participant.stats.kills + participant.stats.assists
      )
    );
    return Number(
      participant.stats.assists + participant.stats.kills >=
        maxKillParticipation
    );
  },
};

export default theGriffin;
