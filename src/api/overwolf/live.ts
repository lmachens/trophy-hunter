import {
  INTERESTED_IN_LEAGUE_FEATURES,
  openWindow,
  setLeagueFeatures,
} from '.';
import { Live, Trophy } from '../../components/trophies/types';
import { Account } from '../accounts';
import { errror, log } from '../logs';
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
let trophyProgress: {
  trophy: Trophy;
  progress: number;
}[] = null;
let notifiedNear: string[] = null;
let notifiedCompleted: string[] = null;

const resetStates = () => {
  unsetLocalStorageItem(PROGRESS);
  unsetLocalStorageItem(LIVE);
  unsetLocalStorageItem(TROPHY_PROGRESS);
  activeTrophies = [];
  trophyProgress = [];
  live = {
    activePlayer: null,
    allPlayers: null,
    events: null,
    gameData: null,
    trophyData: null,
    account: null,
  };
  notifiedNear = [];
  notifiedCompleted = [];
};

const notificate = () => {
  const showTrophyNearCompletion = getLocalStorageItem(
    'trophyNearCompletion',
    true
  );
  const showTrophyCompleted = getLocalStorageItem('trophyCompleted', false);

  const notificateNearTrophies = showTrophyNearCompletion
    ? trophyProgress.filter(
        ({ progress, trophy }) =>
          progress >= 0.8 && progress < 1 && !notifiedNear.includes(trophy.name)
      )
    : [];

  if (notificateNearTrophies.length > 0) {
    notifiedNear = [
      ...notifiedNear,
      ...notificateNearTrophies.map((trophy) => trophy.trophy.name),
    ];
  }

  const notificateCompleteTrophies = showTrophyCompleted
    ? trophyProgress.filter(
        ({ progress, trophy }) =>
          progress === 1 && !notifiedCompleted.includes(trophy.name)
      )
    : [];
  if (notificateCompleteTrophies.length > 0) {
    notifiedCompleted = [
      ...notifiedCompleted,
      ...notificateCompleteTrophies.map((trophy) => trophy.trophy.name),
    ];
  }

  const notificateTrophies = [
    ...notificateNearTrophies,
    ...notificateCompleteTrophies,
  ];
  if (notificateTrophies.length === 0) {
    return;
  }

  const notifications = getLocalStorageItem('notifications', []).filter(
    (notification) =>
      !notificateTrophies.find(
        (achievedTrophy) =>
          achievedTrophy.trophy.name === notification.trophyName
      )
  );

  const newNotifications = [
    ...notifications,
    ...notificateTrophies.map(({ trophy, progress }) => ({
      trophyName: trophy.name,
      progress,
    })),
  ];
  setLocalStorageItem('notifications', newNotifications);
  log('Notificate trophies', newNotifications);

  openWindow('notification');
};

const setTrophyProgress = () => {
  const achievedTrophies = activeTrophies
    .map((trophy) => {
      try {
        return {
          trophy,
          progress: Math.min(1, trophy.checkLive?.(live) || 0),
        };
      } catch (error) {
        console.error(`checkLive error in ${trophy.name}`, error.message);
        return {
          trophy,
          progress: 0,
        };
      }
    })
    .filter(({ progress }) => progress > 0);

  if (achievedTrophies.length === 0) {
    return;
  }
  trophyProgress = [
    ...achievedTrophies,
    ...trophyProgress.filter(
      (progressTrophy) =>
        !achievedTrophies.find(
          (achievedTrophy) =>
            achievedTrophy.trophy.name === progressTrophy.trophy.name
        )
    ),
  ];
  setLocalStorageItem(TROPHY_PROGRESS, trophyProgress);
  notificate();
};

const handleInfoUpdates2 = (
  infoUpdate: overwolf.games.events.InfoUpdates2Event
) => {
  if (infoUpdate.feature !== 'live_client_data') {
    return;
  }
  try {
    const activePlayer = parseJSON(
      infoUpdate.info.live_client_data.active_player
    );
    if (activePlayer) {
      live.activePlayer = activePlayer;
    }
    const allPlayers = parseJSON(infoUpdate.info.live_client_data.all_players);
    if (allPlayers) {
      live.allPlayers = allPlayers;
    }
    const events = parseJSON(infoUpdate.info.live_client_data.events) || {};
    if (events?.Events) {
      live.events = events.Events;
    }
    const gameData = parseJSON(infoUpdate.info.live_client_data.game_data);
    if (gameData) {
      const isNewGameTime = gameData.gameTime !== live.gameData?.gameTime;
      live.gameData = gameData;
      if (
        isNewGameTime &&
        live.gameData?.gameTime &&
        live.activePlayer &&
        live.allPlayers &&
        live.events &&
        live.account
      ) {
        setLocalStorageItem(LIVE, live);
        setTrophyProgress();
      }
    }
  } catch (error) {
    error('[handleInfoUpdates2]', error);
  }
};

const getActiveTrophies = () => {
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

    activeTrophies = getActiveTrophies();
    log(
      `Can achieve ${activeTrophies.length} trophies`,
      activeTrophies.map((trophy) => trophy.name)
    );

    overwolf.games.events.onInfoUpdates2.addListener(handleInfoUpdates2);
  } catch (error) {
    errror('[runLiveCheck]', error);
  }
};

export const stopLiveCheck = (): void => {
  overwolf.games.events.onInfoUpdates2.removeListener(handleInfoUpdates2);
};
