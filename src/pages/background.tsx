import { NextPage } from 'next';
import overwolf from '../api/overwolf';
import { postLogin } from '../api/accounts';
import { useMutation } from 'react-query';
import { useEffect } from 'react';

const LOL_LAUNCHER_ID = 10902;
const LOL_ID = 5426;

const INTERESTED_IN_LAUNCHER_FEATURES = [
  'game_flow',
  'summoner_info',
  'champ_select',
  'lcu_info',
  'lobby_info',
  'end_game',
];

const SR_DRAFT_PICK = 400;
const SR_RANKED_SOLO = 420;
const SR_BLIND_PICK = 430;
const SR_RANKED_FLEX = 440;
const SUPPORTED_QUEUE_IDS = [
  SR_DRAFT_PICK,
  SR_RANKED_SOLO,
  SR_BLIND_PICK,
  SR_RANKED_FLEX,
];

const isLauncherRunning = (
  launcherInfo: overwolf.games.launchers.GetRunningLaunchersInfoResult
) => {
  return (
    launcherInfo?.launchers[0] &&
    Math.floor(launcherInfo.launchers[0].id / 10) === LOL_LAUNCHER_ID
  );
};

const isLeagueRunning = (gameInfo: overwolf.games.GetRunningGameInfoResult) => {
  return gameInfo?.isRunning && Math.floor(gameInfo.id / 10) === LOL_ID;
};

const isLeagueLaunched = (
  gameInfoResult: overwolf.games.GameInfoUpdatedEvent
) => {
  return (
    gameInfoResult?.gameInfo.isRunning &&
    gameInfoResult.runningChanged &&
    !gameInfoResult.gameChanged &&
    Math.floor(gameInfoResult.gameInfo.id / 10) === LOL_ID
  );
};

const openWindow = (windowName) => {
  overwolf.windows.obtainDeclaredWindow(windowName, (result) => {
    if (result.error) {
      throw new Error(result.error);
    }
    overwolf.windows.restore(result.window.id);
  });
};

const Background: NextPage = () => {
  const [login] = useMutation(postLogin);

  useEffect(() => {
    const setFeatures = () => {
      overwolf.games.launchers.events.setRequiredFeatures(
        LOL_LAUNCHER_ID,
        INTERESTED_IN_LAUNCHER_FEATURES,
        (info) => {
          if (info.error) {
            return setTimeout(setFeatures, 2000);
          }

          overwolf.games.launchers.events.getInfo(
            LOL_LAUNCHER_ID,
            (response) => {
              if (response?.res.summoner_info) {
                const {
                  platform_id: platformId,
                  display_name: summonerName,
                } = response.res.summoner_info;

                login({ platformId, summonerName });
              }
            }
          );
        }
      );
    };

    const handleOnLaunched = () => {
      setTimeout(setFeatures, 1000);
      openWindow('desktop');
    };

    overwolf.games.launchers.onLaunched.addListener(handleOnLaunched);

    overwolf.games.launchers.getRunningLaunchersInfo((res) => {
      if (isLauncherRunning(res)) {
        handleOnLaunched();
      }
    });

    const handleAppLaunch = () => {
      overwolf.games.getRunningGameInfo((res) => {
        if (isLeagueRunning(res)) {
          openWindow('in_game');
        }
      });
    };

    overwolf.extensions.onAppLaunchTriggered.addListener(handleAppLaunch);

    const handleLeagueLaunched = () => {
      overwolf.games.launchers.events.getInfo(LOL_LAUNCHER_ID, (info) => {
        if (info.error) {
          return;
        }
        const queueId = parseInt(info.res.lobby_info?.queueId);
        if (SUPPORTED_QUEUE_IDS.includes(queueId)) {
          openWindow('in_game');
        } else {
          console.log(`QueueId ${queueId} is not supported`);
        }
      });
    };

    const handleGameInfoUpdated = (
      res: overwolf.games.GameInfoUpdatedEvent
    ) => {
      if (isLeagueLaunched(res)) {
        handleLeagueLaunched();
      }
    };

    overwolf.games.onGameInfoUpdated.addListener(handleGameInfoUpdated);

    overwolf.games.getRunningGameInfo((res) => {
      if (isLeagueRunning(res)) {
        handleLeagueLaunched();
      }
    });

    return () => {
      overwolf.games.launchers.onLaunched.removeListener(handleOnLaunched);
      overwolf.extensions.onAppLaunchTriggered.removeListener(handleAppLaunch);
      overwolf.games.onGameInfoUpdated.removeListener(handleGameInfoUpdated);
    };
  }, []);

  return null;
};

export default Background;
