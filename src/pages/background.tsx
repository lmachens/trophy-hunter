import { NextPage } from 'next';
import overwolf, {
  LEAGUE_LAUNCHER_ID,
  isLeagueLaunched,
  isLeagueRunning,
  openWindow,
  SUPPORTED_QUEUE_IDS,
  setLeagueLauncherFeatures,
  setLeagueFeatures,
  isLeagueLauncherRunning,
  isLeagueClosed,
} from '../api/overwolf';
import { postLogin, getAccount } from '../api/accounts';
import { setLocalStorageItem, getLocalStorageItem } from '../api/utils/storage';
import { parseJSON } from '../api/utils/json';
import { useState, useEffect } from 'react';
import { useQuery, useMutation } from 'react-query';
import * as levels from '../components/islands/levels';
import { Level } from '../components/levels/types';
import { Trophy, ActiveGame } from '../components/trophies/types';

const INTERESTED_IN_LAUNCHER_FEATURES = [
  'game_flow',
  'summoner_info',
  'lcu_info',
  'lobby_info',
  'end_game',
];
const INTERESTED_IN_LEAGUE_FEATURES = ['live_client_data'];

const Background: NextPage = () => {
  const [leagueRunning, setLeagueRunning] = useState(null);
  const [leagueLauncherRunning, setLeagueLauncherRunning] = useState(null);
  const [playingSupportedGame, setPlayingSupportedGame] = useState(null);
  const { data: account, refetch: fetchAccount } = useQuery(
    'account',
    getAccount,
    {
      manual: true,
    }
  );
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

    return () => {
      clearTimeout(timeoutId);
    };
  }, [leagueLauncherRunning]);

  useEffect(() => {
    if (leagueRunning === null) {
      return;
    }

    if (leagueRunning === false) {
      console.log('League is not running');
      return;
    }
    console.log('League is running');

    const handleInfoUpdate = (infoUpdate) => {
      if (
        infoUpdate.launcherClassId !== LEAGUE_LAUNCHER_ID ||
        infoUpdate.feature !== 'end_game'
      ) {
        return;
      }

      const endGameStats = parseJSON(
        infoUpdate.info.end_game_lol.lol_end_game_stats
      );
      if (endGameStats) {
        localStorage.setItem('checkGameId', endGameStats.gameId);
      }
    };

    overwolf.games.launchers.events.onInfoUpdates.addListener(handleInfoUpdate);

    overwolf.games.launchers.events.getInfo(LEAGUE_LAUNCHER_ID, (info) => {
      if (info.error) {
        return;
      }
      const queueId = parseInt(info.res.lobby_info?.queueId);
      if (!SUPPORTED_QUEUE_IDS.includes(queueId)) {
        console.log(`QueueId ${queueId} is not supported`);
        return;
      }
      setPlayingSupportedGame(true);
      console.log('Fetch account');
      fetchAccount();
    });

    return () => {
      overwolf.games.launchers.events.onInfoUpdates.removeListener(
        handleInfoUpdate
      );
    };
  }, [leagueRunning]);

  useEffect(() => {
    console.log('check useEffect', playingSupportedGame, account);
    if (playingSupportedGame === null || !account) {
      return;
    }

    if (playingSupportedGame === false) {
      console.log('Not playing a supported game');
      return;
    }

    console.log('Playing a supported game');

    openWindow('in_game');

    setLeagueFeatures(INTERESTED_IN_LEAGUE_FEATURES);

    const activeGame: ActiveGame = {
      activePlayer: null,
      allPlayers: null,
      events: {
        Events: [],
      },
      gameData: null,
      trophyData: {},
    };

    const activeLevels = account.levels.filter(
      (level) => level.status === 'active'
    );

    const trophies = activeLevels.reduce<Trophy[]>((trophies, accountLevel) => {
      const level = levels[accountLevel.name] as Level;
      return [...trophies, ...level.trophies];
    }, []);

    console.log(`Can achieve ${trophies.length} trophies`, trophies);

    const handleInfoUpdates2 = (
      infoUpdate: overwolf.games.events.InfoUpdates2Event
    ) => {
      if (infoUpdate.feature !== 'live_client_data') {
        return;
      }

      activeGame.activePlayer =
        parseJSON(infoUpdate.info.live_client_data.active_player) ||
        activeGame.activePlayer;
      activeGame.allPlayers =
        parseJSON(infoUpdate.info.live_client_data.all_players) ||
        activeGame.allPlayers;
      activeGame.gameData =
        parseJSON(infoUpdate.info.live_client_data.game_data) ||
        activeGame.gameData;
      const events = parseJSON(infoUpdate.info.live_client_data.events) || {};
      if (events?.Events) {
        activeGame.events.Events.push(...events.Events);
      }

      const achievedTrophies = trophies.filter((trophy) =>
        trophy.checkLive?.({
          activeGame,
          account,
        })
      );

      if (achievedTrophies.length === 0) {
        return;
      }

      setLocalStorageItem('notifications', [
        ...getLocalStorageItem('notifications', []),
        ...achievedTrophies.map((trophy) => ({
          title: 'Achievement completed!',
          trophyName: trophy.name,
        })),
      ]);
      openWindow('notification');
    };

    overwolf.games.events.onInfoUpdates2.addListener(handleInfoUpdates2);
    return () => {
      overwolf.games.events.onInfoUpdates2.removeListener(handleInfoUpdates2);
    };
  }, [playingSupportedGame, account]);

  return null;
};

export default Background;
