import { NextPage } from 'next';
import overwolf, {
  LEAGUE_LAUNCHER_ID,
  isLeagueLaunched,
  isLeagueRunning,
  openWindow,
  SUPPORTED_QUEUE_IDS,
  setLeagueLauncherFeatures,
  isLeagueLauncherRunning,
  isLeagueClosed,
  closeWindow,
} from '../api/overwolf';
import { postLogin } from '../api/accounts';
import { parseJSON } from '../api/utils/json';
import { useState, useEffect } from 'react';
import { useMutation } from 'react-query';

const INTERESTED_IN_LAUNCHER_FEATURES = [
  'game_flow',
  'summoner_info',
  'lcu_info',
  'lobby_info',
  'end_game',
];

const Background: NextPage = () => {
  const [leagueRunning, setLeagueRunning] = useState(null);
  const [leagueLauncherRunning, setLeagueLauncherRunning] = useState(null);
  const [playingSupportedGame, setPlayingSupportedGame] = useState(null);

  const [login] = useMutation(postLogin);

  useEffect(() => {
    const launchedByEvent = globalThis.location?.search.includes(
      'source=gamelaunchevent'
    );
    if (!launchedByEvent) {
      console.log('Not launched by event => open Desktop window');
      openWindow('desktop');
    }

    const handleLauncherLaunched = (
      launcher: overwolf.games.launchers.LauncherInfo
    ) => {
      if (Math.floor(launcher.id / 10) === LEAGUE_LAUNCHER_ID) {
        setLeagueLauncherRunning(true);
      }
    };

    const handleLauncherTerminated = (
      launcher: overwolf.games.launchers.LauncherInfo
    ) => {
      if (Math.floor(launcher.id / 10) === LEAGUE_LAUNCHER_ID) {
        setLeagueLauncherRunning(false);
      }
    };

    overwolf.games.launchers.onLaunched.addListener(handleLauncherLaunched);
    overwolf.games.launchers.onTerminated.addListener(handleLauncherTerminated);

    overwolf.games.launchers.getRunningLaunchersInfo((res) => {
      setLeagueLauncherRunning(isLeagueLauncherRunning(res));
    });

    const handleGameInfoUpdated = (
      res: overwolf.games.GameInfoUpdatedEvent
    ) => {
      if (isLeagueLaunched(res)) {
        setLeagueRunning(true);
      } else if (isLeagueClosed(res)) {
        setLeagueRunning(false);
        setPlayingSupportedGame(false);
      }
    };
    overwolf.games.onGameInfoUpdated.addListener(handleGameInfoUpdated);

    overwolf.games.getRunningGameInfo((res) => {
      setLeagueRunning(isLeagueRunning(res));
    });

    const handleAppLaunch = () => {
      overwolf.games.getRunningGameInfo((res) => {
        const leagueIsRunning = isLeagueRunning(res);
        setLeagueRunning(leagueIsRunning);

        if (leagueIsRunning) {
          openWindow('in_game');
        } else {
          openWindow('desktop');
        }
      });
    };

    overwolf.extensions.onAppLaunchTriggered.addListener(handleAppLaunch);

    return () => {
      overwolf.games.onGameInfoUpdated.removeListener(handleGameInfoUpdated);
      overwolf.extensions.onAppLaunchTriggered.removeListener(handleAppLaunch);
      overwolf.games.launchers.onLaunched.removeListener(
        handleLauncherLaunched
      );
      overwolf.games.launchers.onTerminated.removeListener(
        handleLauncherTerminated
      );
    };
  }, []);

  useEffect(() => {
    if (leagueLauncherRunning === null) {
      return;
    }

    if (leagueLauncherRunning === false) {
      console.log(`League launcher is not running`);
      return;
    }
    console.log(`League launcher is running`);

    openWindow('desktop');
    const timeoutId = setTimeout(() => {
      setLeagueLauncherFeatures(INTERESTED_IN_LAUNCHER_FEATURES, () => {
        overwolf.games.launchers.events.getInfo(
          LEAGUE_LAUNCHER_ID,
          (response) => {
            if (response?.res.summoner_info) {
              const {
                platform_id: platformId,
                display_name: summonerName,
              } = response.res.summoner_info;

              console.log(`Login as ${summonerName} on ${platformId}`);
              login({ platformId, summonerName });
            }
          }
        );
      });
    }, 1000);

    const handleInfoUpdate = (infoUpdate) => {
      if (infoUpdate.launcherClassId !== LEAGUE_LAUNCHER_ID) {
        return;
      }
      if (infoUpdate.feature === 'end_game' && infoUpdate.info.end_game_lol) {
        const endGameStats = parseJSON(
          infoUpdate.info.end_game_lol.lol_end_game_stats
        );
        if (
          endGameStats &&
          localStorage.getItem('checkGameId') !== endGameStats.gameId.toString()
        ) {
          console.log(`Check game ${endGameStats.gameId}`);
          localStorage.setItem('checkGameId', endGameStats.gameId);
        }
      }
      if (infoUpdate.feature === 'lobby_info' && infoUpdate.info.lobby_info) {
        const queueId = parseInt(infoUpdate.info.lobby_info.queueId);
        if (isNaN(queueId) || !SUPPORTED_QUEUE_IDS.includes(queueId)) {
          console.log(
            `QueueId ${infoUpdate.info.lobby_info?.queueId} is not supported`
          );
        } else {
          console.log('QueueId is supported');
          setPlayingSupportedGame(true);
        }
      }
    };

    overwolf.games.launchers.events.onInfoUpdates.addListener(handleInfoUpdate);

    overwolf.games.launchers.events.getInfo(LEAGUE_LAUNCHER_ID, (info) => {
      if (info.error) {
        return;
      }
      const queueId = parseInt(info.res.lobby_info?.queueId);
      if (isNaN(queueId) || !SUPPORTED_QUEUE_IDS.includes(queueId)) {
        console.log(`QueueId ${info.res.lobby_info?.queueId} is not supported`);
      } else {
        console.log('QueueId is supported');
        setPlayingSupportedGame(true);
      }
    });

    return () => {
      clearTimeout(timeoutId);
      overwolf.games.launchers.events.onInfoUpdates.removeListener(
        handleInfoUpdate
      );
    };
  }, [leagueLauncherRunning]);

  useEffect(() => {
    if (leagueRunning) {
      console.log('League is running');
    } else if (leagueRunning === false) {
      console.log('League is not running');
      closeWindow('in_game');
      return;
    }

    if (playingSupportedGame) {
      console.log('Playing a supported game');
    } else if (playingSupportedGame === false) {
      console.log('Not playing a supported game');
    }

    if (leagueRunning && playingSupportedGame) {
      openWindow('in_game');
    }
  }, [leagueRunning, playingSupportedGame]);

  return null;
};

export default Background;
