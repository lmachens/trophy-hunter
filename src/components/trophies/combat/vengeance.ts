import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';

const vengeance: Trophy = {
  island: 'hubIsland',
  name: 'vengeance',
  level: 'combat3',
  title: 'Vengeance',
  description:
    'Revenge three of your teammates deaths (kill their killer in ten seconds after their death).',
  category: 'combat',
  maxProgress: 3,
  checkProgress: ({ match, timeline, account }) => {
    const participant = getParticipantByAccount(match, account);
    const teammateIds = match.participants
      .filter(
        (matchParticipant) =>
          matchParticipant.teamId === participant.teamId &&
          matchParticipant.participantId !== participant.teamId
      )
      .map((teammate) => teammate.participantId);

    const teammateDeaths = timeline.frames.reduce(
      (current, frame) => [
        ...current,
        ...frame.events.filter(
          (event) =>
            event.type === 'CHAMPION_KILL' &&
            teammateIds.includes(event.victimId)
        ),
      ],
      []
    );

    const kills = timeline.frames.reduce(
      (current, frame) => [
        ...current,
        ...frame.events.filter(
          (event) =>
            event.type === 'CHAMPION_KILL' &&
            event.killerId === participant.participantId
        ),
      ],
      []
    );

    const vengeanceKills = teammateDeaths.filter((teammateDeath) =>
      kills.find((kill) => {
        const isVicKillBeforeKill = teammateDeath.timestamp < kill.timestamp;
        const isVicKillAtMost10SBefore =
          teammateDeath.timestamp + 10000 > kill.timestamp;
        return isVicKillBeforeKill && isVicKillAtMost10SBefore;
      })
    ).length;

    const existingTrophy = account.trophies.find(
      (trophy) => trophy.name === 'vengeance'
    );
    const progress =
      (existingTrophy ? existingTrophy.progress : 0) + vengeanceKills / 3;

    return progress;
  },
  checkLive: ({ events, allPlayers, account }) => {
    if (!events.length) {
      return 0;
    }

    const ownPlayer = allPlayers.find(
      (player) => player.summonerName === account.summoner.name
    );
    const teammateNames = allPlayers
      .filter(
        (player) =>
          player.summonerName !== ownPlayer.summonerName &&
          player.team === ownPlayer.team
      )
      .map((teammate) => teammate.summonerName);

    const teammateDeaths = events.filter(
      (event) =>
        event.EventName === 'ChampionKill' &&
        teammateNames.includes(event.VictimName)
    );

    const kills = events.filter(
      (event) =>
        event.EventName === 'ChampionKill' &&
        event.KillerName === ownPlayer.summonerName
    );

    const vengeanceKills = teammateDeaths.filter((teammateDeath) =>
      kills.find((kill) => {
        const isVicKillBeforeKill = teammateDeath.EventTime < kill.EventTime;
        const isVicKillAtMost10SBefore =
          teammateDeath.EventTime + 10 > kill.EventTime;
        return isVicKillBeforeKill && isVicKillAtMost10SBefore;
      })
    ).length;

    const existingTrophy = account.trophies.find(
      (trophy) => trophy.name === 'vengeance'
    );
    const progress =
      (existingTrophy ? existingTrophy.progress : 0) + vengeanceKills / 3;

    return progress;
  },
};

export default vengeance;
