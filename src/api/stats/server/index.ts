import { getAccountsCollection } from '../../accounts/server/collection';
import { StatsObj } from '../types';

type Stats = {
  _id: string;
  completed: number;
  total: number;
};

export const getStatsObj = async () => {
  const Accounts = await getAccountsCollection();
  const stats = await Accounts.aggregate<Stats>([
    { $unwind: '$trophies' },
    {
      $group: {
        _id: '$trophies.name',
        completed: {
          $sum: { $cond: [{ $eq: ['$trophies.status', 'completed'] }, 1, 0] },
        },
        total: { $sum: 1 },
      },
    },
  ]).toArray();
  const statsObj = stats.reduce<StatsObj>(
    (previous, current) => ({
      ...previous,
      [current._id]: {
        completed: current.completed,
        total: current.total,
      },
    }),
    {}
  );
  return statsObj;
};
