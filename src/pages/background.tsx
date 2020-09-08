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

const Background: NextPage = () => {
  const [leagueRunning, setLeagueRunning] = useState(null);
  const [leagueLauncherRunning, setLeagueLauncherRunning] = useState(null);
  const [playingSupportedGame, setPlayingSupportedGame] = useState(null);
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
        setPlayingSupportedGame(false);
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
      return;
    }

    if (leagueLauncherRunning === false) {
      console.log(`League launcher is not running`);
      return;
    }
    console.log(`League launcher is running`);
    if (autoLaunch) {
      openWindow('desktop');
    }

    const timeoutId = setTimeout(() => {
      setLeagueLauncherFeatures(INTERESTED_IN_LAUNCHER_FEATURES, () => {
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
                  console.error(
                    `SummonerName not found ${JSON.stringify(
                      response.res.summoner_info
                    )}`
                  );
                  setTimeout(getSummonerInfo, 1000);
                } else if (isGarenaUser === 'true' || isGarenaUser === true) {
                  console.info(
                    `User ${summonerName} ${platformId} is a garena user`
                  );
                  localStorage.setItem('isGarenaUser', 'true');
                } else {
                  localStorage.removeItem('isGarenaUser');
                  console.log(`Login as ${summonerName} on ${platformId}`);
                  login({ platformId, summonerName });
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

    const handleInfoUpdate = (infoUpdate) => {
      if (infoUpdate.launcherClassId !== LEAGUE_LAUNCHER_ID) {
        return;
      }
      if (infoUpdate.feature === 'lobby_info' && infoUpdate.info?.lobby_info) {
        const queueId = parseInt(infoUpdate.info.lobby_info.queueId);
        if (isNaN(queueId)) {
          console.log(
            `QueueId is NaN: ${JSON.stringify(infoUpdate.info.lobby_info)}`
          );

          return;
        }
        if (!SUPPORTED_QUEUE_IDS.includes(queueId)) {
          setPlayingSupportedGame(false);
          console.log(`QueueId ${queueId} is not supported`);
        } else {
          console.log(`QueueId ${queueId} is supported`);
          setPlayingSupportedGame(true);
        }
      }
    };

    overwolf.games.launchers.events.onInfoUpdates.addListener(handleInfoUpdate);

    overwolf.games.launchers.events.getInfo(LEAGUE_LAUNCHER_ID, (info) => {
      if (info.error || !info.res) {
        return;
      }
      const queueId = parseInt(info.res.lobby_info?.queueId);
      if (isNaN(queueId)) {
        console.log(`QueueId is NaN: ${JSON.stringify(info.res.lobby_info)}`);
        return;
      }
      if (!SUPPORTED_QUEUE_IDS.includes(queueId)) {
        console.log(`QueueId ${queueId} is not supported`);
        setPlayingSupportedGame(false);
      } else {
        console.log(`QueueId ${queueId} is supported`);
        setPlayingSupportedGame(true);
      }
    });

    return () => {
      clearTimeout(timeoutId);
      overwolf.games.launchers.events.onInfoUpdates.removeListener(
        handleInfoUpdate
      );
    };
  }, [leagueLauncherRunning, autoLaunch]);

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

    if (leagueRunning && playingSupportedGame && autoLaunch) {
      openWindow('in_game');
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
          console.log(`Check game ${endGameStats.gameId}`);
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
