import { Trophy } from '../types';

const playstyle: Trophy = {
  island: 'hub',
  name: 'playstyle',
  level: 'welcome',
  title: 'New Born',
  description:
    "Play one game of Summoner's Rift or ARAM with the Trophy Hunter app.",
  category: 'hub',
  aramSupport: true,
  checkProgress: () => 1,
};

export default playstyle;
