import { Trophy } from '../types';

const theCougar: Trophy = {
  island: 'skills',
  name: 'theCougar',
  level: 'skills5',
  title: 'The Cougar',
  description:
    'Have a 1000 gold lead over the opposing jungler as a jungler at 10 minutes.',
  category: 'skills',
  checkProgress: ({ match, participant, timeline }) => {
    if (participant.lane !== 'JUNGLE') {
      return 0;
    }
    const otherJungler = match.info.participants.find(
      (player) =>
        player.lane === 'JUNGLE' && player.teamId !== participant.teamId
    );
    if (!otherJungler) {
      return 0;
    }
    const frameAt10 = timeline.info.frames[9].participantFrames;
    if (!frameAt10) {
      return 0;
    }

    const goldAt10 = frameAt10[participant.participantId].currentGold;
    const goldAt10OtherJungler =
      frameAt10[otherJungler.participantId].currentGold;

    const theCougar = goldAt10OtherJungler + 1000 <= goldAt10;
    return Number(theCougar);
  },
};

export default theCougar;
