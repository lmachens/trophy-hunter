import { NextPage } from 'next';
import overwolf, {
  addLeagueLauncherListener,
  LEAGUE_LAUNCHER_ID,
  isLeagueLaunched,
  isLeagueRunning,
  openWindow,
  SUPPORTED_QUEUE_IDS,
  setLeagueLauncherFeatures,
} from '../api/overwolf';
import { postLogin } from '../api/accounts';

const launchedByEvent = globalThis.location?.search.includes(
  'source=gamelaunchevent'
);
if (!launchedByEvent) {
  openWindow('desktop');
}

const INTERESTED_IN_LAUNCHER_FEATURES = [
  'game_flow',
  'summoner_info',
  'lcu_info',
  'lobby_info',
  'end_game',
];

const handleOnLaunched = () => {
  setTimeout(() => {
    setLeagueLauncherFeatures(INTERESTED_IN_LAUNCHER_FEATURES, () => {
      overwolf.games.launchers.events.getInfo(
        LEAGUE_LAUNCHER_ID,
        (response) => {
          if (response?.res.summoner_info) {
            const {
              platform_id: platformId,
              display_name: summonerName,
            } = response.res.summoner_info;

            postLogin({ platformId, summonerName });
          }
        }
      );
    });
  }, 1000);
  openWindow('desktop');
};

addLeagueLauncherListener(handleOnLaunched);

const handleAppLaunch = () => {
  overwolf.games.getRunningGameInfo((res) => {
    if (isLeagueRunning(res)) {
      openWindow('in_game');
    } else {
      openWindow('desktop');
    }
  });
};

overwolf.extensions.onAppLaunchTriggered.addListener(handleAppLaunch);

const handleLeagueLaunched = () => {
  overwolf.games.launchers.events.getInfo(LEAGUE_LAUNCHER_ID, (info) => {
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

const handleGameInfoUpdated = (res: overwolf.games.GameInfoUpdatedEvent) => {
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

const handleInfoUpdate = (infoUpdate) => {
  if (
    infoUpdate.launcherClassId !== LEAGUE_LAUNCHER_ID ||
    infoUpdate.feature !== 'end_game'
  ) {
    return;
  }

  try {
    const { gameId } = JSON.parse(
      infoUpdate.info.end_game_lol.lol_end_game_stats
    );
    localStorage.setItem('checkGameId', gameId);
  } catch (error) {
    console.error(error);
  }
};

overwolf.games.launchers.events.onInfoUpdates.addListener(handleInfoUpdate);

const Background: NextPage = () => {
  return null;
};

export default Background;
