import {
  MatchTimeline,
  MatchPostion,
  Match,
  ParticipantIdentity,
  Participant,
  MatchEvents,
} from './types';
import { Account } from '../accounts';

const THIRTY_SECONDS = 30 * 1000;
const FIFTEEN_MINUTES = 15 * 60 * 1000;
const THIRTY_MINUTES = 30 * 60 * 1000;
const FOURTY_FIVE_MINUTES = 45 * 60 * 1000;

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
      participantIdentity.player.accountId === account.summoner.accountId
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
