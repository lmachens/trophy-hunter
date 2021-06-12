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
      ...match.info.participants.map(
        (participant) => participant.kills + participant.assists
      )
    );
    return Number(
      participant.assists + participant.kills >= maxKillParticipation
    );
  },
};

export default theGriffin;
