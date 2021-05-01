import {
  MatchTimeline,
  MatchPostion,
  Match,
  ParticipantIdentity,
  Participant,
  MatchEvents,
} from './types';
import { Account } from '../accounts';
import {
  FIFTEEN_MINUTES,
  THIRTY_MINUTES,
  THIRTY_SECONDS,
  FOURTY_FIVE_MINUTES,
} from '../utils/dates';

export const SUMMONERS_RIFT_MAP_ID = 11;
export const HOWLING_ABYSS_MAP_ID = 12;
export const MAP_LABELS = {
  [SUMMONERS_RIFT_MAP_ID]: "Summoner's Rift",
  [HOWLING_ABYSS_MAP_ID]: 'ARAM',
};

export const eventTimeToTimestamp = (eventTime: number): number => {
  return eventTime * 1000;
};

export const calcDeathTime = (level: number, timestamp: number): number => {
  let baseTimer = 0;
  if (level <= 6) {
    baseTimer = 4 + 2 * level;
  } else if (level === 7) {
    baseTimer = 21;
  } else {
    baseTimer = 8 + 2.5 * level;
  }
  let timeMultiplier = 1.0;
  if (timestamp > FIFTEEN_MINUTES && timestamp <= THIRTY_MINUTES) {
    timeMultiplier +=
      ((timestamp - FIFTEEN_MINUTES) / THIRTY_SECONDS) * 0.00425;
  } else if (timestamp > THIRTY_MINUTES && timestamp <= FOURTY_FIVE_MINUTES) {
    timeMultiplier +=
      0.1275 + ((timestamp - THIRTY_MINUTES) / THIRTY_SECONDS) * 0.003;
  } else if (timestamp > FOURTY_FIVE_MINUTES) {
    timeMultiplier +=
      0.2175 + ((timestamp - FOURTY_FIVE_MINUTES) / THIRTY_SECONDS) * 0.0175;
  }
  // time multiplier maxes out at 50%
  timeMultiplier = Math.max(timeMultiplier, 1.5);
  const deathTime = baseTimer * timeMultiplier * 1000;
  return deathTime;
};

export const getAllEvents = (timeline: MatchTimeline): MatchEvents => {
  return timeline.frames.reduce(
    (current, frame) => [...current, ...frame.events],
    []
  );
};

export const getMinionsAtMin = (
  timeline: MatchTimeline,
  minute: number,
  participantId: number
): number => {
  const frame = timeline.frames.find(
    (frame) => frame.timestamp > minute * 60 * 1000
  );
  if (!frame) {
    return 0;
  }
  const participantFrame = Object.values(frame.participantFrames).find(
    (participantFrame) => participantFrame.participantId === participantId
  );
  return participantFrame.minionsKilled + participantFrame.jungleMinionsKilled;
};

export const getLevelUps = (
  events: MatchEvents,
  participantId: number
): MatchEvents => {
  return events.filter(
    (event) =>
      event.type === 'SKILL_LEVEL_UP' &&
      event.levelUpType === 'NORMAL' &&
      event.participantId === participantId
  );
};

export const calcLevel = (
  events: MatchEvents,
  participantId: number,
  timestamp: number
): number => {
  const levelUps = getLevelUps(events, participantId);
  return levelUps.filter((levelUp) => levelUp.timestamp <= timestamp).length;
};

export const TURRET_POSITIONS_BY_TEAM = {
  100: [
    [10504, 1029],
    [981, 10441],
    [6919, 1483],
    [4281, 1253],
    [5846, 6396],
    [5048, 4812],
    [3651, 3696],
    [2177, 1807],
    [1748, 2270],
    [1512, 6699],
    [1169, 4287],
  ],
  200: [
    [13866, 4505],
    [8955, 8510],
    [9767, 10113],
    [11134, 11207],
    [4318, 13875],
    [7943, 13411],
    [10481, 13650],
    [12611, 13084],
    [13052, 12612],
    [13327, 8226],
    [13624, 10572],
  ],
};
export const TURRET_RANGE = 500;
export const BUFF_POSITIONS = [
  [7700, 3800],
  [3600, 8000],
  [7100, 11000],
  [11100, 6900],
];

export const isInEnemyTurretRange = (
  position: MatchPostion,
  teamId: number
): boolean => {
  const turretPositions = TURRET_POSITIONS_BY_TEAM[teamId];

  return turretPositions.some(
    (turretPosition) =>
      Math.sqrt(
        Math.pow(position.x - turretPosition[0], 2) +
          Math.pow(position.y - turretPosition[1], 2)
      ) <= TURRET_RANGE
  );
};

export const getParticipantIdentity = (
  match: Match,
  account: Account
): ParticipantIdentity => {
  return match.participantIdentities.find(
    (participantIdentity) =>
      participantIdentity.player.currentAccountId === account.summoner.accountId
  );
};

export const getParticipant = (
  match: Match,
  participantIdentity: ParticipantIdentity
): Participant => {
  return match.participants.find(
    (participant) =>
      participant.participantId === participantIdentity.participantId
  );
};

export const getParticipantByAccount = (
  match: Match,
  account: Account
): Participant => {
  const participantIdentity = getParticipantIdentity(match, account);
  return getParticipant(match, participantIdentity);
};

export const getAllEventsByType = (
  events: MatchEvents,
  type: string
): MatchEvents => {
  return events.filter((event) => event.type === type);
};

export const getAllKills = (events: MatchEvents): MatchEvents => {
  return getAllEventsByType(events, 'CHAMPION_KILL');
};

export const getParticipantKills = (
  events: MatchEvents,
  participantId: number
): MatchEvents => {
  return events.filter(
    (event) =>
      event.type === 'CHAMPION_KILL' && event.killerId === participantId
  );
};

export const getParticipantSoloKills = (
  events: MatchEvents,
  participantId: number
): MatchEvents => {
  return events.filter(
    (event) =>
      event.type === 'CHAMPION_KILL' &&
      event.killerId === participantId &&
      event.assistingParticipantIds.length === 0
  );
};

export const getParticipantKillsAndAssists = (
  events: MatchEvents,
  participantId: number
): MatchEvents => {
  return events.filter(
    (event) =>
      event.type === 'CHAMPION_KILL' &&
      (event.killerId === participantId ||
        event.assistingParticipantIds.includes(participantId))
  );
};

export const getParticipantDeaths = (
  events: MatchEvents,
  participantId: number
): MatchEvents => {
  return events.filter(
    (event) =>
      event.type === 'CHAMPION_KILL' && event.victimId === participantId
  );
};

export const getParticipantAssists = (
  events: MatchEvents,
  participantId: number
): MatchEvents => {
  return events.filter(
    (event) =>
      event.type === 'CHAMPION_KILL' &&
      event.assistingParticipantIds.includes(participantId)
  );
};

export const getLaneOpponent = (
  participants: Participant[],
  participant: Participant
): Participant => {
  const laneOpponents = participants.filter(
    (otherParticipant) =>
      otherParticipant.teamId !== participant.teamId &&
      otherParticipant.timeline.lane === participant.timeline.lane &&
      otherParticipant.timeline.role === participant.timeline.role
  );

  if (laneOpponents.length === 0) {
    return null;
  }

  if (laneOpponents.length === 1) {
    return laneOpponents[0];
  }
  if (laneOpponents.length === 2) {
    // this can happen on botlane if the system doesnt understand who is adc and who is support
    const laneOpponent1CS =
      laneOpponents[0].stats.totalMinionsKilled +
      laneOpponents[0].stats.neutralMinionsKilled;
    const laneOpponent2CS =
      laneOpponents[1].stats.totalMinionsKilled +
      laneOpponents[1].stats.neutralMinionsKilled;
    return laneOpponent1CS > laneOpponent2CS
      ? laneOpponents[0]
      : laneOpponents[1];
  }
};

export const getTeammates = (
  match: Match,
  participant: Participant
): Participant[] => {
  return match.participants.filter(
    (matchParticipant) =>
      matchParticipant.teamId === participant.teamId &&
      matchParticipant.participantId !== participant.participantId
  );
};

export const getOpponents = (
  match: Match,
  participant: Participant
): Participant[] => {
  return match.participants.filter(
    (matchParticipant) => matchParticipant.teamId !== participant.teamId
  );
};

export const getTeam = (match: Match, teamId: number): Participant[] => {
  return match.participants.filter(
    (matchParticipant) => matchParticipant.teamId === teamId
  );
};

export const getOtherParticipants = (
  match: Match,
  participant: Participant
): Participant[] => {
  return match.participants.filter(
    (matchParticipant) =>
      matchParticipant.participantId !== participant.participantId
  );
};

export const calcTotalGoldFrames = (
  timeline: MatchTimeline,
  teamId: number
) => {
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
