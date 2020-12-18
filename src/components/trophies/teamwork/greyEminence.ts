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
      ...match.participants.map((participant) => participant.stats.assists)
    );
    const minDeaths = Math.min(
      ...match.participants.map((participant) => participant.stats.deaths)
    );

    return Number(
      participant.stats.assists >= maxAssists &&
        participant.stats.deaths <= minDeaths
    );
  },
};

export default greyEminence;
