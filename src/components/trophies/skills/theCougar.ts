import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';

const theCougar: Trophy = {
  island: 'skillsIsland',
  name: 'theCougar',
  level: 'skills5',
  title: 'The Cougar',
  description:
    'Have a 1000 gold lead over the opposing jungler as a jungler at 10 minutes.',
  category: 'skills',
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);
    if (participant.timeline.lane !== 'JUNGLE') {
      return 0;
    }
    const otherJungler = match.participants.find(
      (player) =>
        player.timeline.lane === 'JUNGLE' &&
        player.teamId !== participant.teamId
    );
    if (!otherJungler) {
      return 0;
    }

    const goldAt10 = participant.timeline.goldPerMinDeltas['0-10'] * 10;
    const goldAt10OtherJungler =
      otherJungler.timeline.goldPerMinDeltas['0-10'] * 10;

    const theCougar = goldAt10OtherJungler + 1000 <= goldAt10;
    return Number(theCougar);
  },
};

export default theCougar;
