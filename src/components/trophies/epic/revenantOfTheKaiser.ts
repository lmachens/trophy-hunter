import { Trophy } from '../types';
import { getTeam } from '../../../api/riot/helpers';

const revenantOfTheKaiser: Trophy = {
  island: 'epic',
  name: 'revenantOfTheKaiser',
  level: 'epic1',
  title: 'Revenant Of The Kaiser',
  description:
    'Kill the elder dragon, then secure baron nashor in the 60 seconds following.',
  category: 'epic',
  checkProgress: ({ match, events, participant }) => {
    const teamIds = getTeam(match, participant.teamId).map(
      (teammate) => teammate.participantId
    );

    const elderDragonKills = events.filter(
      (event) =>
        event.type === 'ELITE_MONSTER_KILL' &&
        event.monsterSubType === 'ELDER_DRAGON' &&
        teamIds.includes(event.killerId)
    );
    const baronKills = events.filter(
      (event) =>
        event.type === 'ELITE_MONSTER_KILL' &&
        event.monsterType === 'BARON_NASHOR' &&
        teamIds.includes(event.killerId)
    );

    const hasElderIntoBaronKill = elderDragonKills.some((elderDragonKill) =>
      baronKills.some(
        (baronKill) =>
          baronKill.timestamp > elderDragonKill.timestamp &&
          elderDragonKill.timestamp + 60000 > baronKill.timestamp
      )
    );
    return Number(hasElderIntoBaronKill);
  },
  checkLive: ({ events, allPlayers, account }) => {
    const accountPlayer = allPlayers.find(
      (player) => player.summonerName === account.summoner.name
    );

    const teamNames = allPlayers
      .filter((player) => player.team === accountPlayer.team)
      .map((player) => player.summonerName);

    const elderDragonKills = events.filter(
      (event) =>
        event.DragonType === 'Elder' && teamNames.includes(event.KillerName)
    );

    const baronKills = events.filter(
      (event) =>
        event.EventName === 'BaronKill' && teamNames.includes(event.KillerName)
    );

    const hasElderIntoBaronKill = elderDragonKills.some((elderDragonKill) =>
      baronKills.some(
        (baronKill) =>
          baronKill.EventTime > elderDragonKill.EventTime &&
          elderDragonKill.EventTime + 60 > baronKill.EventTime
      )
    );
    return Number(hasElderIntoBaronKill);
  },
};

export default revenantOfTheKaiser;
