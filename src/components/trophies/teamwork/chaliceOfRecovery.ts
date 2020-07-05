import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';
import { zip } from '../../../api/utils/arrays';
import { MatchTimeline } from '../../../api/riot/types';

const calcTotalGoldFrames = (timeline: MatchTimeline, teamId: number) => {
  const teamThreshold = 5;
  return timeline.frames.map(({ participantFrames }) => {
    let result = 0;
    let from;
    let to;
    if (teamId === 100) {
      from = 1;
      to = teamThreshold + 1;
    } else {
      from = teamThreshold + 1;
      to = teamThreshold * 2 + 1;
    }
    for (let i = from; i < to; i++) {
      if (participantFrames[i]) {
        result += participantFrames[i].totalGold;
      }
    }
    return result;
  });
};

const chaliceOfRecovery: Trophy = {
  island: 'teamworkIsland',
  name: 'chaliceOfRecovery',
  level: 'teamwork2',
  title: 'Chalice Of Recovery',
  description: 'Win a match where your team was 5000 gold behind.',
  category: 'teamwork',
  checkProgress: ({ match, timeline, account }) => {
    const participant = getParticipantByAccount(match, account);

    const team = match.teams.find((team) => team.teamId === participant.teamId);
    const opponent = match.teams.find(
      (team) => team.teamId !== participant.teamId
    );

    const teamGoldFrames = calcTotalGoldFrames(timeline, team.teamId);
    const opponentGoldFrames = calcTotalGoldFrames(timeline, opponent.teamId);

    const teamGoldDiffFrames = zip(teamGoldFrames, opponentGoldFrames).map(
      (frame) => frame[0] - frame[1]
    );

    const teamMaxGoldDown = Math.min(...teamGoldDiffFrames);

    return Number(teamMaxGoldDown > 5000 && team.win === 'Win');
  },
};

export default chaliceOfRecovery;
