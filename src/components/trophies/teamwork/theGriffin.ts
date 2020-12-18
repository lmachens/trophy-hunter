import { Trophy } from '../types';

const theGriffin: Trophy = {
  island: 'teamwork',
  name: 'theGriffin',
  level: 'teamwork1',
  title: 'The Griffin',
  description: 'Have highest kill participation of your team.',
  category: 'teamwork',
  checkProgress: ({ match, participant }) => {
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
