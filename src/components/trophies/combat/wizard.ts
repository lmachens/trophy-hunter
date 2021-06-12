import { Trophy } from '../types';

const wizard: Trophy = {
  island: 'combat',
  name: 'wizard',
  level: 'combat4',
  title: 'Wizard',
  description:
    'Deal more magic damage to champions than anyone else total damage to champions.',
  category: 'combat',
  checkProgress: ({ match, participant }) => {
    const others = match.info.participants.filter(
      (other) => other.participantId !== participant.participantId
    );
    const maxTotalDamageDealtToChampions = Math.max(
      ...others.map((other) => other.totalDamageDealtToChampions)
    );

    return Number(
      participant.magicDamageDealtToChampions >= maxTotalDamageDealtToChampions
    );
  },
};

export default wizard;
