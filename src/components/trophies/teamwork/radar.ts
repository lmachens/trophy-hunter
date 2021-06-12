import { Trophy } from '../types';

const radar: Trophy = {
  island: 'teamwork',
  name: 'radar',
  level: 'teamwork4',
  title: 'Radar',
  description: 'Place most wards, control wards and clear most wards.',
  category: 'teamwork',
  checkProgress: ({ match, participant }) => {
    const maxWardsPlaced = Math.max(
      ...match.info.participants.map((participant) => participant.wardsPlaced)
    );
    const maxWardsKilled = Math.max(
      ...match.info.participants.map((participant) => participant.wardsKilled)
    );
    const maxVisionWardsBoughtInGame = Math.max(
      ...match.info.participants.map(
        (participant) => participant.visionWardsBoughtInGame
      )
    );

    return Number(
      participant.wardsPlaced >= maxWardsPlaced &&
        participant.wardsKilled >= maxWardsKilled &&
        participant.visionWardsBoughtInGame >= maxVisionWardsBoughtInGame
    );
  },
};

export default radar;
