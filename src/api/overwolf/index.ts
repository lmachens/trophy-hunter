// Creates magic proxy to avoid crashes non-overwolf environments

import { log } from '../logs';
import { getLocalStorageItem, setLocalStorageItem } from '../utils/storage';

if (typeof overwolf === 'undefined') {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  globalThis.overwolf = new Proxy(
    () => {
      return;
    },
    {
      get() {
        return overwolf;
      },
    }
  );
}

export default overwolf;

export const LEAGUE_LAUNCHER_ID = 10902;
export const LOL_ID = 5426;
export const INTERESTED_IN_LAUNCHER_FEATURES = [
  'game_flow',
  'summoner_info',
  'lcu_info',
  'lobby_info',
  'end_game',
];
export const INTERESTED_IN_LEAGUE_FEATURES = ['live_client_data'];

export const isLeagueLauncherRunning = (
  launchers: overwolf.games.launchers.LauncherInfo[]
): boolean => {
  return launchers.some(
    (launcher) => Math.floor(launcher.id / 10) === LEAGUE_LAUNCHER_ID
  );
};

export const isLeagueRunning = (
  gameInfo: overwolf.games.RunningGameInfo
): boolean => {
  return Boolean(
    gameInfo?.isRunning && Math.floor(gameInfo.id / 10) === LOL_ID
  );
};

export const isLeagueGameId = (gameId: number) =>
  Math.floor(gameId / 10) === LOL_ID;

export const isLeagueLaunched = (
  gameInfoResult: overwolf.games.GameInfoUpdatedEvent
): boolean => {
  return Boolean(
    gameInfoResult?.gameInfo?.isRunning &&
      (gameInfoResult.runningChanged || gameInfoResult.gameChanged) &&
      isLeagueGameId(gameInfoResult.gameInfo.id)
  );
};

export const isLeagueClosed = (
  gameInfoResult: overwolf.games.GameInfoUpdatedEvent
) => {
  return Boolean(
    gameInfoResult?.gameInfo?.isRunning === false &&
      gameInfoResult.runningChanged &&
      isLeagueGameId(gameInfoResult.gameInfo.id)
  );
};

export const openWindow = (windowName: WindowName) => {
  log(`Open window ${windowName}`);
  return new Promise((resolve, reject) => {
    overwolf.windows.obtainDeclaredWindow(windowName, (result) => {
      if (result.error) {
        return reject(result.error);
      }
      overwolf.windows.restore(result.window.id, resolve);
    });
  });
};

export const closeWindow = (windowName: WindowName) => {
  log(`Close window ${windowName}`);
  return new Promise((resolve, reject) => {
    overwolf.windows.obtainDeclaredWindow(windowName, (result) => {
      if (result.error) {
        return reject(result.error);
      }
      overwolf.windows.close(result.window.id, resolve);
    });
  });
};

export const toggleInGameWindow = async (forceRestore = false) => {
  const windowName = getLocalStorageItem<WindowName>(
    'prefered-window',
    'second_screen'
  );
  log(`toggleInGameWindow ${windowName}`);

  const secondScreen = await getMonitor(false);
  overwolf.windows.obtainDeclaredWindow(
    secondScreen ? windowName : 'in_game',
    (result) => {
      if (
        forceRestore ||
        !result.success ||
        ['minimized', 'hidden', 'closed'].includes(result.window.stateEx)
      ) {
        overwolf.windows.restore(result.window.id);
      } else {
        overwolf.windows.minimize(result.window.id);
      }
    }
  );
};

export const closeWindowById = (windowId: string) => {
  return new Promise((resolve) => overwolf.windows.close(windowId, resolve));
};

export const closeCurrentWindow = async () => {
  const currentWindow = await getCurrentWindow();
  await closeWindowById(currentWindow.id);
};

export const restoreCurrentWindow = (): void => {
  overwolf.windows.getCurrentWindow((result) => {
    overwolf.windows.restore(result.window.id);
  });
};

export const flashUntilFocus = (windowName: string): void => {
  log(`flashUntilFocus ${windowName}`);
  overwolf.windows.flash(
    windowName,
    // @ts-ignore
    overwolf.windows.enums.FlashBehavior.automatic
  );
};

export const SR_DRAFT_PICK = 400;
export const SR_RANKED_SOLO = 420;
export const SR_BLIND_PICK = 430;
export const SR_RANKED_FLEX = 440;
export const SUPPORTED_QUEUE_IDS = [
  SR_DRAFT_PICK,
  SR_RANKED_SOLO,
  SR_BLIND_PICK,
  SR_RANKED_FLEX,
];

export const queues = {
  [SR_DRAFT_PICK]: 'Draft',
  [SR_RANKED_SOLO]: 'Solo/Duo',
  [SR_BLIND_PICK]: 'Blind',
  [SR_RANKED_FLEX]: 'Flex',
};

if (getLocalStorageItem('dev', false)) {
  SUPPORTED_QUEUE_IDS.push(-1);
}
export const setLeagueLauncherFeatures = (
  interestedInFeatures: string[],
  onReady?: () => void
) => {
  overwolf.games.launchers.events.setRequiredFeatures(
    LEAGUE_LAUNCHER_ID,
    interestedInFeatures,
    (info) => {
      if (info.error) {
        return setTimeout(
          () => setLeagueLauncherFeatures(interestedInFeatures, onReady),
          2000
        );
      }

      log('Successfully set League Launcher features');
      if (onReady) {
        onReady();
      }
    }
  );
};

export const setLeagueFeatures = (interestedInFeatures: string[]) => {
  return new Promise((res) => {
    const setRequiredFeatures = (interestedInFeatures: string[]) => {
      overwolf.games.events.setRequiredFeatures(
        interestedInFeatures,
        (info) => {
          if (!info.success) {
            return setTimeout(
              () => setRequiredFeatures(interestedInFeatures),
              2000
            );
          }

          log('Successfully set League features');
          res(null);
        }
      );
    };
    setRequiredFeatures(interestedInFeatures);
  });
};

export const getHotkey = (name: string) => {
  return new Promise((resolve, reject) => {
    overwolf.settings.hotkeys.get((result) => {
      if (!result.success) {
        return reject('unknown');
      }
      const hotkey = result.games[LOL_ID]?.find(
        (hotkey) => hotkey.name === name
      );
      if (!hotkey) {
        return reject('unknown');
      }
      return resolve(hotkey.binding);
    });
  });
};

export const getAppVersion = () => {
  return new Promise<string>((resolve) => {
    overwolf.extensions.current.getManifest((manifest) =>
      resolve(`v${manifest.meta.version}`)
    );
  });
};

export const isAppUpdated = async () => {
  const lastVersion = getLocalStorageItem('lastVersion', '');
  const version = await getAppVersion();
  const isUpdated = version !== lastVersion;
  setLocalStorageItem('lastVersion', version);
  return isUpdated;
};

export type WindowName =
  | 'background'
  | 'desktop'
  | 'in_game'
  | 'second_screen'
  | 'notification'
  | 'not_supported';

export const getDisplays = () => {
  return new Promise<overwolf.utils.Display[]>((resolve) => {
    overwolf.utils.getMonitorsList((result) => {
      resolve(result.displays);
    });
  });
};

export const getCurrentWindow = () => {
  return new Promise<overwolf.windows.WindowInfo>((resolve, reject) => {
    overwolf.windows.getCurrentWindow((result) => {
      if (result.error) {
        return reject(result.error);
      }
      resolve(result.window);
    });
  });
};

export const getMonitor = async (primaryDisplay: boolean) => {
  const monitors = await getDisplays();

  const monitor = monitors.find(
    (display) => display.is_primary === primaryDisplay
  );
  return monitor;
};

export const centerWindow = async (
  window: overwolf.windows.WindowInfo,
  primaryDisplay = true
) => {
  const monitor = await getMonitor(primaryDisplay);

  return new Promise((resolve) => {
    overwolf.windows.changePosition(
      window.name,
      monitor.x + Math.round((monitor.width - window.width) / 2),
      monitor.y + Math.round((monitor.height - window.height) / 2),
      resolve
    );
  });
};

export const getRunningGameInfo = () => {
  return new Promise<overwolf.games.GetRunningGameInfoResult>((resolve) => {
    overwolf.games.getRunningGameInfo((res) => {
      resolve(res);
    });
  });
};

export const isWindowStateVisible = (
  stateEx: overwolf.windows.WindowStateEx
) => {
  return ['normal', 'maximized'].includes(stateEx);
};
