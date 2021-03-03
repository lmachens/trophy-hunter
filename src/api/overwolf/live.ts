import {
  INTERESTED_IN_LEAGUE_FEATURES,
  LEAGUE_LAUNCHER_ID,
  openWindow,
  setLeagueFeatures,
  SUPPORTED_QUEUE_IDS,
} from '.';
import { Live, Trophy } from '../../components/trophies/types';
import { Account } from '../accounts';
import { error, log } from '../logs';
import { waitFor } from '../utils/async';
import { parseJSON } from '../utils/json';
import {
  getLocalStorageItem,
  setLocalStorageItem,
  unsetLocalStorageItem,
} from '../utils/storage';
import * as levels from '../../components/islands/levels';
import { Level } from '../../components/levels/types';

export const PROGRESS = 'PROGRESS';
export const LIVE = 'LIVE';
export const TROPHY_PROGRESS = 'TROPHY_PROGRESS';

let activeTrophies: Trophy[] = null;
let live: Live = null;
let notifiedNear: string[] = null;
let notifiedCompleted: string[] = null;

const resetStates = () => {
  unsetLocalStorageItem(PROGRESS);
  unsetLocalStorageItem(LIVE);
  unsetLocalStorageItem(TROPHY_PROGRESS);
  activeTrophies = null;
  live = {
    activePlayer: null,
    allPlayers: null,
    events: null,
    gameData: null,
    trophyData: {},
    account: null,
  };
  notifiedNear = null;
  notifiedCompleted = null;
};
resetStates();

const setTrophyProgress = (account: Account) => {
  const trophiesProgress = activeTrophies.map((trophy) => {
    try {
      return {
        trophyName: trophy.name,
        progress: Math.min(
          1,
          trophy.checkLive?.(live) ||
            account.trophies.find(
              (accountTrophy) => accountTrophy.name === trophy.name
            )?.progress ||
            0
        ),
      };
    } catch (error) {
      console.error(`checkLive error in ${trophy.name}`, error.message);
      return {
        trophyName: trophy.name,
        progress: 0,
      };
    }
  });

  const progressByTrophyName = trophiesProgress.reduce((acc, cur) => ({
    ...acc,
    [cur.trophyName]: cur.progress,
  }));
  setLocalStorageItem(TROPHY_PROGRESS, progressByTrophyName);

  const showTrophyNearCompletion = getLocalStorageItem(
    'trophyNearCompletion',
    true
  );
  const showTrophyCompleted = getLocalStorageItem('trophyCompleted', true);

  const nearCompletedTrophies = showTrophyNearCompletion
    ? trophiesProgress.filter(
        (trophyProgress) =>
          trophyProgress.progress >= 0.8 &&
          trophyProgress.progress < 1 &&
          !notifiedNear.includes(trophyProgress.trophyName)
      )
    : [];
  nearCompletedTrophies.forEach((nearCompletedTrophy) => {
    notifiedNear.push(nearCompletedTrophy.trophyName);
  });

  const completedTrophies = showTrophyCompleted
    ? trophiesProgress.filter(
        (trophyProgress) =>
          trophyProgress.progress >= 1 &&
          !notifiedCompleted.includes(trophyProgress.trophyName)
      )
    : [];
  completedTrophies.forEach((completedTrophy) => {
    const activeTrophyIndex = activeTrophies.findIndex(
      (activeTrophy) => activeTrophy.name === completedTrophy.trophyName
    );
    if (activeTrophyIndex > -1) {
      activeTrophies.splice(activeTrophyIndex, 1);
    }
    notifiedCompleted.push(completedTrophy.trophyName);
  });

  const notificateTrophies = [...nearCompletedTrophies, ...completedTrophies];
  if (notificateTrophies.length === 0) {
    return;
  }

  const notifications = getLocalStorageItem('notifications', []).filter(
    (notification) =>
      !notificateTrophies.find(
        (notificateTrophy) =>
          notificateTrophy.trophyName === notification.trophyName
      )
  );

  const newNotifications = [...notifications, ...notificateTrophies];
  setLocalStorageItem('notifications', newNotifications);
  log('Notificate trophies', newNotifications);

  openWindow('notification');
};

const handleLiveClientData = (liveClientData: {
  active_player?: string;
  all_players?: string;
  events?: string;
  game_data?: string;
}) => {
  try {
    const activePlayer = parseJSON(liveClientData.active_player);
    if (activePlayer) {
      live.activePlayer = activePlayer;
    }
    const allPlayers = parseJSON(liveClientData.all_players);
    if (allPlayers) {
      live.allPlayers = allPlayers;
    }
    const events = parseJSON(liveClientData.events) || {};
    if (events?.Events) {
      live.events = events.Events;
    }
    const gameData = parseJSON(liveClientData.game_data);
    if (gameData) {
      const isNewGameTime = gameData.gameTime !== live.gameData?.gameTime;
      live.gameData = gameData;
      if (
        isNewGameTime &&
        live.gameData?.gameTime &&
        live.activePlayer &&
        live.allPlayers &&
        live.events &&
        live.account &&
        live.trophyData
      ) {
        setLocalStorageItem(LIVE, live);
        if (!activeTrophies) {
          activeTrophies = getActiveTrophies(live.gameData.gameMode);
          log(
            `Can achieve ${activeTrophies.length} trophies`,
            activeTrophies.map((trophy) => trophy.name)
          );
        }
        setTrophyProgress(live.account);
      }
    }
  } catch (error) {
    console.error(error);
    error('[handleInfoUpdates2]', error.message);
  }
};

const handleInfoUpdates2 = (
  infoUpdate: overwolf.games.events.InfoUpdates2Event
) => {
  if (infoUpdate.feature !== 'live_client_data') {
    return;
  }
  handleLiveClientData(infoUpdate.info.live_client_data);
};

const getActiveTrophies = (gameMode: 'CLASSIC' | 'ARAM') => {
  const activeLevels = live.account.levels.filter(
    (level) => level.status === 'active'
  );

  return activeLevels.reduce<Trophy[]>((trophies, accountLevel) => {
    const level = levels[accountLevel.name] as Level;
    return [
      ...trophies,
      ...level.trophies.filter((trophy) => {
        const accountTrophy = live.account.trophies.find(
          (accountTrophy) => accountTrophy.name === trophy.name
        );
        if (gameMode === 'ARAM') {
          return accountTrophy?.status !== 'completed' && trophy.aramSupport;
        }
        return accountTrophy?.status !== 'completed';
      }),
    ];
  }, []);
};

export const runLiveCheck = async (account: Account): Promise<void> => {
  try {
    log('Run live check');
    setLocalStorageItem(PROGRESS, 0);
    resetStates();
    live.account = account;
    setLocalStorageItem(PROGRESS, 0.5);
    await waitFor(1000);
    await setLeagueFeatures(INTERESTED_IN_LEAGUE_FEATURES);
    setLocalStorageItem(PROGRESS, 1);
    overwolf.games.events.getInfo((event) => {
      if (event.res.live_client_data) {
        handleLiveClientData(event.res.live_client_data);
      }
    });
    overwolf.games.events.onInfoUpdates2.addListener(handleInfoUpdates2);
  } catch (err) {
    console.error(err);
    error('[runLiveCheck]', err.message);
  }
};

export const stopLiveCheck = (): void => {
  overwolf.games.events.onInfoUpdates2.removeListener(handleInfoUpdates2);
};

export const isPlayingSupportedGame = async (): Promise<boolean | number> => {
  return new Promise((resolve) => {
    let launcherInfoTimeoutId = null;
    const getLauncherInfo = (hideError = false) => {
      overwolf.games.launchers.events.getInfo(LEAGUE_LAUNCHER_ID, (info) => {
        if (info.error || info.status === 'error' || !info.res) {
          if (!hideError) {
            error('[launchers getInfo]', info);
          }
          clearTimeout(launcherInfoTimeoutId);
          launcherInfoTimeoutId = setTimeout(() => getLauncherInfo(true), 5000);
          return;
        }

        const { lobby_info: lobbyInfo, game_flow: gameFlow } = info.res;
        if (!gameFlow || !lobbyInfo) {
          return resolve(false);
        }

        if (gameFlow.phase !== 'InProgress' && gameFlow.phase !== 'GameStart') {
          log(`[getInfo] gameFlow.phase is ${gameFlow.phase}`);
          resolve(false);
        } else if (lobbyInfo?.queueId) {
          const queueId = parseInt(info.res.lobby_info.queueId);
          if (isNaN(queueId)) {
            log(
              `[getInfo] QueueId is NaN: ${JSON.stringify(info.res.lobby_info)}`
            );
            return;
          }
          if (!SUPPORTED_QUEUE_IDS.includes(queueId)) {
            log(`[getInfo] QueueId ${queueId} is not supported`);
            resolve(false);
          } else {
            resolve(queueId);
          }
        }
      });
    };
    getLauncherInfo();
  });
};
