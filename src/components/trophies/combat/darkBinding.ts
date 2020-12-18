import { Trophy } from '../types';

const darkBinding: Trophy = {
  island: 'combat',
  name: 'darkBinding',
  level: 'combat7',
  title: 'Dark Binding',
  description:
    'CC enemy champions for at least 100 seconds (soft cc counts for 1/2, slows count for 1/6 of their duration).',
  category: 'combat',
  checkProgress: ({ participant }) => {
    return participant.stats.timeCCingOthers / 100;
  },
};

export default darkBinding;
