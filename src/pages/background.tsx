import { NextPage } from 'next';
import overwolf, {
  LEAGUE_LAUNCHER_ID,
  isLeagueLaunched,
  isLeagueRunning,
  openWindow,
  setLeagueLauncherFeatures,
  isLeagueLauncherRunning,
  isLeagueClosed,
  closeWindow,
  INTERESTED_IN_LAUNCHER_FEATURES,
  getVersion,
  toggleInGameWindow,
} from '../api/overwolf';
import { postLogin } from '../api/accounts';
import { parseJSON } from '../api/utils/json';
import { useState, useEffect } from 'react';
import { useQueryClient, useMutation } from 'react-query';
import usePersistentState from '../hooks/usePersistentState';
import Head from 'next/head';
import { log } from '../api/logs';
import {
  isPlayingSupportedGame,
  runLiveCheck,
  stopLiveCheck,
} from '../api/overwolf/live';
import { useAccount } from '../contexts/account';
import { trackHotkey } from '../api/performance';

getVersion().then((version) => log(`Running v${version}`));

const Background: NextPage = () => {
  const [leagueRunning, setLeagueRunning] = useState(null);
  const [leagueLauncherRunning, setLeagueLauncherRunning] = useState(null);
  const [playingSupportedGame, setPlayingSupportedGame] = useState(null);
  const [registeredFeatures, setRegisteredFeatures] = useState(false);
  const [autoLaunch] = usePersistentState('autoLaunch', true);
  const { account } = useAccount();
  const queryClient = useQueryClient();

  const { mutate: login } = useMutation(postLogin, {
    onSuccess: () => {
      queryClient.invalidateQueries('account');
    },
  });

  useEffect(() => {
    const handleHotkeyPressed = async (
      event: overwolf.settings.hotkeys.OnPressedEvent
    ) => {
      if (event.name === 'show_trophy_hunter') {
        trackHotkey(event.name);
        const playingSupportedGame = await isPlayingSupportedGame();
        if (!playingSupportedGame) {
          log('Not playing a supported game');
          openWindow('not_supported');
          return;
        }
        toggleInGameWindow();
      }
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
      overwolf.games.getRunningGameInfo(async (res) => {
        const leagueIsRunning = isLeagueRunning(res);
        setLeagueRunning(leagueIsRunning);

        if (leagueIsRunning && res.isInFocus) {
          const playingSupportedGame = await isPlayingSupportedGame();
          if (playingSupportedGame) {
            log(`Playing a supported game ${playingSupportedGame}`);
            toggleInGameWindow(true);
            runLiveCheck(account);
          } else {
            log(`Not playing a supported game ${playingSupportedGame}`);
            openWindow('not_supported');
          }
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
    if (!account || !registeredFeatures) {
      return;
    }
    if (leagueRunning === false) {
      log('League is not running');
      closeWindow('in_game');
      closeWindow('second_screen');
      return;
    }

    if (leagueRunning) {
      log('League is running');
      isPlayingSupportedGame().then((playingSupportedGame) => {
        setPlayingSupportedGame(playingSupportedGame);
        if (autoLaunch) {
          if (playingSupportedGame) {
            log(`Playing a supported game ${playingSupportedGame}`);
            toggleInGameWindow(true);
            runLiveCheck(account);
          } else {
            log(`Not playing a supported game ${playingSupportedGame}`);
            openWindow('not_supported');
          }
        }
      });
      return stopLiveCheck;
    }
  }, [leagueRunning, registeredFeatures, autoLaunch, account?._id]);

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
