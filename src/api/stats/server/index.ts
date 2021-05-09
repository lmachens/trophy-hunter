import { getAccountsCollection } from '../../accounts/server/collection';
import { getChampions } from '../../riot/server';
import { StatsObj, TrophyStatsAggregationObj } from '../types';
import { getTrophyStatsCollection } from './collection';

type Stats = {
  _id: string;
  completed: number;
  total: number;
};

export const getStatsObj = async () => {
  const Accounts = await getAccountsCollection();
  const stats = await Accounts.aggregate<Stats>([
    {
      $match: {
        trophies: { $elemMatch: { name: 'playstyle', status: 'completed' } },
      },
    },
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

export const getTrophyStats = async (trophyName: string) => {
  const champions = await getChampions();

  const TrophyStats = await getTrophyStatsCollection();
  return TrophyStats.aggregate<TrophyStatsAggregationObj>([
    {
      $match: {
        trophyName: trophyName,
      },
    },
    {
      $sort: {
        count: -1,
      },
    },
    {
      $group: {
        _id: '$trophyName',
        totalChecks: {
          $sum: '$checks',
        },
        totalCount: {
          $sum: '$count',
        },
        top: {
          $push: {
            championId: '$championId',
            mapId: '$mapId',
            checks: '$checks',
            count: '$count',
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        trophyName: '$_id',
        totalChecks: 1,
        totalCount: 1,
        top: {
          $slice: ['$top', 5],
        },
      },
    },
  ])
    .map((result) => ({
      ...result,
      top: result.top.map((top) => ({
        ...top,
        championName:
          champions.find(
            (champion) => champion.key === top.championId.toString()
          )?.name || 'Unknown',
      })),
    }))
    .toArray();
};

type UpdateTrophyStatsProps = {
  trophyName: string;
  mapId: number;
  championId: number;
  obtained: boolean;
};
export const updateTrophyStats = async ({
  trophyName,
  mapId,
  championId,
  obtained,
}: UpdateTrophyStatsProps) => {
  const TrophyStats = await getTrophyStatsCollection();
  return TrophyStats.updateOne(
    {
      trophyName,
      mapId,
      championId,
    },
    {
      $inc: {
        checks: 1,
        count: +obtained,
      },
    },
    {
      upsert: true,
    }
  );
};
