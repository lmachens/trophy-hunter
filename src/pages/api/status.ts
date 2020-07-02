import { NextApiRequest, NextApiResponse } from 'next';
import {
  applyMiddleware,
  withError,
  withMethods,
} from '../../api/utils/server/middleware';
import { getEventStatus } from '../../api/overwolf/server';
import {
  LOL_ID,
  LEAGUE_LAUNCHER_ID,
  INTERESTED_IN_LAUNCHER_FEATURES,
  INTERESTED_IN_LEAGUE_FEATURES,
} from '../../api/overwolf';

export default applyMiddleware(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const [leagueStatus, launcherStatus] = await Promise.all([
      getEventStatus(LOL_ID),
      getEventStatus(LEAGUE_LAUNCHER_ID),
    ]);
    const leagueIssues = leagueStatus.features.filter(
      (feature) =>
        INTERESTED_IN_LEAGUE_FEATURES.includes(feature.name) &&
        feature.state !== 1
    );
    const launcherIssues = launcherStatus.features.filter(
      (feature) =>
        INTERESTED_IN_LAUNCHER_FEATURES.includes(feature.name) &&
        feature.state !== 1
    );

    const issues = [];
    if (leagueIssues.length > 0) {
      issues.push('league');
    }
    if (launcherIssues.length > 0) {
      issues.push('launcher');
    }
    res.json(issues);
  },
  withError,
  withMethods('GET')
);
