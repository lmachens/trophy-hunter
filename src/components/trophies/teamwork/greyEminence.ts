import { Trophy } from '../types';

const greyEminence: Trophy = {
  island: 'teamwork',
  name: 'greyEminence',
  level: 'teamwork3',
  title: 'Grey Eminence',
  description: 'Have most assists while having the least number of deaths.',
  category: 'teamwork',
  checkProgress: ({ match, participant }) => {
    const maxAssists = Math.max(
      ...match.info.participants.map((participant) => participant.assists)
    );
    const minDeaths = Math.min(
      ...match.info.participants.map((participant) => participant.deaths)
    );

    return Number(
      participant.assists >= maxAssists && participant.deaths <= minDeaths
    );
  },
};

export default greyEminence;
