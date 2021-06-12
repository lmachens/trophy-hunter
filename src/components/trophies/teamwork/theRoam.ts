import { Trophy } from '../types';
import {
  getParticipantDeaths,
  getParticipantKillsAndAssists,
} from '../../../api/riot/helpers';

const theRoam: Trophy = {
  island: 'teamwork',
  name: 'theRoam',
  level: 'teamwork8',
  title: 'The Roam',
  description:
    'You are support and you participate in a kill on midlane pre 10 minutes and your ADC may not die in +-10 seconds around that kill.',
  category: 'teamwork',
  checkProgress: ({ match, participant, events }) => {
    if (participant.role !== 'DUO_SUPPORT') {
      return 0;
    }
    const middleX = 7435;
    const middleY = 7490;
    const adc = match.info.participants.find(
      (teammate) =>
        teammate.role === 'DUO_CARRY' && teammate.teamId === participant.teamId
    );

    if (!adc) {
      return 0;
    }

    const adcDeaths = getParticipantDeaths(events, adc.participantId);
    const killParticipations = getParticipantKillsAndAssists(
      events,
      participant.participantId
    );

    const roamingKills = killParticipations.filter((kill) => {
      const before10Mins = kill.timestamp <= 60 * 10000;
      const midLane =
        Math.sqrt(
          (kill.position.x - middleX) * (kill.position.x - middleX) +
            (kill.position.y - middleY) * (kill.position.y - middleY)
        ) <= 2000;
      // adc didnt die +- 10 sec of that roaming kill
      const noADCDeath20Sec = !adcDeaths.some(
        (death) =>
          death.timestamp + 10000 < kill.timestamp &&
          death.timestamp - 10000 > kill.timestamp
      );
      return before10Mins && midLane && noADCDeath20Sec;
    }).length;

    return roamingKills;
  },
};

export default theRoam;
