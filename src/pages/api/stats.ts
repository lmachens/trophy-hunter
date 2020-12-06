import { NextApiRequest, NextApiResponse } from 'next';
import { getAccountsCollection } from '../../api/accounts/server/collection';
import { THREE_MINUTES } from '../../api/utils/dates';
import {
  applyMiddleware,
  withDatabase,
  withError,
  withMethods,
} from '../../api/utils/server/middleware';

type Stats = {
  _id: string;
  completed: number;
  total: number;
};

type StatsObj = {
  [_id: string]: {
    completed: number;
    total: number;
  };
};

const getStatsObj = async () => {
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
const cache = {
  timestamp: 0,
  promise: null,
};
export default applyMiddleware(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (cache.timestamp < Date.now() - THREE_MINUTES) {
      cache.promise = getStatsObj();
      cache.timestamp = Date.now();
    }

    const statsObj = await cache.promise;

    res.setHeader('Cache-Control', 'max-age=180');
    res.json(statsObj);
  },
  withDatabase,
  withError,
  withMethods('GET')
);
