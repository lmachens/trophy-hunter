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
  toggleWindow,
  INTERESTED_IN_LAUNCHER_FEATURES,
} from '../api/overwolf';
import { postLogin } from '../api/accounts';
import { parseJSON } from '../api/utils/json';
import { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import usePersistentState from '../hooks/usePersistentState';
import Head from 'next/head';
import { log } from '../api/logs';

overwolf.extensions.current.getManifest((manifest) =>
  log(`Running v${manifest.meta.version}`)
);

const Background: NextPage = () => {
  const [leagueRunning, setLeagueRunning] = useState(null);
  const [leagueLauncherRunning, setLeagueLauncherRunning] = useState(null);
  const [playingSupportedGame, setPlayingSupportedGame] = useState(null);
  const [registeredFeatures, setRegisteredFeatures] = useState(false);
  const [autoLaunch] = usePersistentState('autoLaunch', true);

  const [login] = useMutation(postLogin);

  useEffect(() => {
    const handleHotkeyPressed = () => {
      toggleWindow('in_game');
    };

    overwolf.settings.hotkeys.onPressed.addListener(handleHotkeyPressed);

    return () => {
      overwolf.settings.hotkeys.onPressed.removeListener(handleHotkeyPressed);
    };
  }, []);

  useEffect(() => {
    const launchedByEvent = globalThis.location?.search.includes(
      'source=gamelaunchevent'
    );
    if (!launchedByEvent) {
      log('Not launched by event => open Desktop window');
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
      if (res.success) {
        setLeagueLauncherRunning(isLeagueLauncherRunning(res.launchers));
      }
    });

    const handleGameInfoUpdated = (
      res: overwolf.games.GameInfoUpdatedEvent
    ) => {
      if (isLeagueLaunched(res)) {
        setLeagueRunning(true);
      } else if (isLeagueClosed(res)) {
        setLeagueRunning(false);
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

        if (leagueIsRunning && res.isInFocus) {
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
      log(`League launcher is null`);
      return;
    }

    if (leagueLauncherRunning === false) {
      log(`League launcher is not running`);
      return;
    }
    log(`League launcher is running`);
    if (autoLaunch) {
      openWindow('desktop');
    }

    const timeoutId = setTimeout(() => {
      setLeagueLauncherFeatures(INTERESTED_IN_LAUNCHER_FEATURES, () => {
        let summonerNotFound = false;
        const getSummonerInfo = () => {
          overwolf.games.launchers.events.getInfo(
            LEAGUE_LAUNCHER_ID,
            (response) => {
              if (response?.res?.summoner_info) {
                const {
                  platform_id: platformId,
                  display_name: summonerName,
                  is_garena_user: isGarenaUser,
                } = response.res.summoner_info;
                if (!summonerName || !platformId) {
                  if (!summonerNotFound) {
                    console.error(
                      `SummonerName not found ${JSON.stringify(
                        response.res.summoner_info
                      )}`
                    );
                    summonerNotFound = true;
                  }
                  setTimeout(getSummonerInfo, 1000);
                } else if (isGarenaUser === 'true' || isGarenaUser === true) {
                  console.info(
                    `User ${summonerName} ${platformId} is a garena user`
                  );
                  localStorage.setItem('isGarenaUser', 'true');
                  setRegisteredFeatures(true);
                } else {
                  localStorage.removeItem('isGarenaUser');
                  log(`Login as ${summonerName} on ${platformId}`);
                  login({ platformId, summonerName });
                  setRegisteredFeatures(true);
                }
              } else {
                setTimeout(getSummonerInfo, 1000);
              }
            }
          );
        };

        getSummonerInfo();
      });
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [leagueLauncherRunning, autoLaunch]);

  useEffect(() => {
    if (!registeredFeatures) {
      return;
    }

    const handleInfoUpdate = (infoUpdate) => {
      if (
        infoUpdate.launcherClassId !== LEAGUE_LAUNCHER_ID ||
        !infoUpdate.info?.lobby_info
      ) {
        return;
      }
      const queueId = parseInt(infoUpdate.info.lobby_info.queueId);
      if (isNaN(queueId)) {
        log(
          `[handleInfoUpdate] QueueId is NaN: ${JSON.stringify(
            infoUpdate.info.lobby_info
          )}`
        );
        return;
      }
      if (!SUPPORTED_QUEUE_IDS.includes(queueId)) {
        setPlayingSupportedGame(false);
        log(`[handleInfoUpdate] QueueId ${queueId} is not supported`);
      } else {
        log(`[handleInfoUpdate] QueueId ${queueId} is supported`);
        setPlayingSupportedGame(true);
      }
    };

    overwolf.games.launchers.events.onInfoUpdates.addListener(handleInfoUpdate);

    overwolf.games.launchers.events.getInfo(LEAGUE_LAUNCHER_ID, (info) => {
      if (info.error || !info.res || !info.res.lobby_info) {
        return;
      }
      const queueId = parseInt(info.res.lobby_info.queueId);
      if (isNaN(queueId)) {
        log(`[getInfo] QueueId is NaN: ${JSON.stringify(info.res.lobby_info)}`);
        return;
      }
      if (!SUPPORTED_QUEUE_IDS.includes(queueId)) {
        log(`[getInfo] QueueId ${queueId} is not supported`);
        setPlayingSupportedGame(false);
      } else {
        log(`[getInfo] QueueId ${queueId} is supported`);
        setPlayingSupportedGame(true);
      }
    });

    return () => {
      overwolf.games.launchers.events.onInfoUpdates.removeListener(
        handleInfoUpdate
      );
    };
  }, [registeredFeatures]);

  useEffect(() => {
    if (leagueRunning) {
      log('League is running');
    } else if (leagueRunning === false) {
      log('League is not running');
      closeWindow('in_game');
      return;
    }

    if (leagueRunning && autoLaunch) {
      if (playingSupportedGame) {
        log('Playing a supported game');
        openWindow('in_game');
      } else if (playingSupportedGame === false) {
        log('Not playing a supported game');
        openWindow('not_supported');
      }
    }
  }, [leagueRunning, playingSupportedGame, autoLaunch]);

  useEffect(() => {
    if (!playingSupportedGame) {
      return;
    }

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
          log(`Check game ${endGameStats.gameId}`);
          localStorage.setItem('checkGameId', endGameStats.gameId);
        }
      }
    };

    overwolf.games.launchers.events.onInfoUpdates.addListener(handleInfoUpdate);

    return () => {
      overwolf.games.launchers.events.onInfoUpdates.removeListener(
        handleInfoUpdate
      );
    };
  }, [playingSupportedGame]);

  return (
    <Head>
      <title>Trophy Hunter - Background</title>
    </Head>
  );
};

export default Background;
