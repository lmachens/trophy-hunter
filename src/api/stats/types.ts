export type StatsObj = {
  [_id: string]: {
    completed: number;
    total: number;
  };
};

export type TrophyStatsObj = {
  trophyName: string;
  mapId: number;
  championId: number;
  checks: number;
  count: number;
};

export type TrophyStatsAggregationObj = {
  trophyName: string;
  totalChecks: number;
  totalCount: number;
  top: {
    championId: number;
    championName: string;
    mapId: number;
    checks: number;
    count: number;
  }[];
};
