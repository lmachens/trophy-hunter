import { warn } from '../../../api/logs';
import { getMinionsAtMin } from '../../../api/riot/helpers';
import { Trophy } from '../types';

const precision: Trophy = {
  island: 'skillsIsland',
  name: 'precision',
  level: 'skills2',
  title: 'Precision',
  description:
    'Be 15 cs ahead of your lane opponent at 10 minutes as top, mid or adc.',
  category: 'skills',
  checkProgress: ({ match, account, participant, timeline }) => {
    const opponent = match.participants.find(
      (otherParticipant) =>
        otherParticipant.participantId !== participant.participantId &&
        otherParticipant.timeline.role === participant.timeline.role &&
        otherParticipant.timeline.lane === participant.timeline.lane
    );
    if (!opponent) {
      warn(
        `Can not find lane opponent for ${account.summoner.name} as ${participant.timeline.role} ${participant.timeline.lane}`
      );
      return 0;
    }

    const participantMinions = getMinionsAtMin(
      timeline,
      10,
      participant.participantId
    );
    const opponentMinions = getMinionsAtMin(
      timeline,
      10,
      opponent.participantId
    );

    const creepsDiffAt10 = participantMinions - opponentMinions;
    return creepsDiffAt10 / 15;
  },
  checkLive: ({ allPlayers, trophyData, gameData, account }) => {
    if (!allPlayers || !gameData || trophyData.precision) {
      return 0;
    }
    if (gameData.gameTime < 600 || gameData.gameTime > 660) {
      return 0;
    }
    trophyData.precision = true;

    const accountPlayer = allPlayers.find(
      (player) => player.summonerName === account.summoner.name
    );
    const opponent = allPlayers.find(
      (player) =>
        player.position === accountPlayer.position &&
        player.team !== accountPlayer.team
    );
    if (!opponent) {
      warn(
        `Can not find lane opponent for ${accountPlayer.summonerName} as ${accountPlayer.position}`
      );
      return 0;
    }

    return Number(
      accountPlayer.scores.creepScore >= opponent.scores.creepScore + 15
    );
  },
};

export default precision;
