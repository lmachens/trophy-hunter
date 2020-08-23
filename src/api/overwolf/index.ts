// Creates magic proxy to avoid crashes non-overwolf environments

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
  launcherInfo: overwolf.games.launchers.GetRunningLaunchersInfoResult
) => {
  return (
    launcherInfo?.launchers[0] &&
    Math.floor(launcherInfo.launchers[0].id / 10) === LEAGUE_LAUNCHER_ID
  );
};

export const isLeagueRunning = (gameInfo: overwolf.games.RunningGameInfo) => {
  return Boolean(
    gameInfo?.isRunning && Math.floor(gameInfo.id / 10) === LOL_ID
  );
};

export const isLeagueLaunched = (
  gameInfoResult: overwolf.games.GameInfoUpdatedEvent
) => {
  return Boolean(
    gameInfoResult?.gameInfo?.isRunning &&
      (gameInfoResult.runningChanged || gameInfoResult.gameChanged) &&
      Math.floor(gameInfoResult.gameInfo.id / 10) === LOL_ID
  );
};

export const isLeagueClosed = (
  gameInfoResult: overwolf.games.GameInfoUpdatedEvent
) => {
  return Boolean(
    gameInfoResult?.gameInfo?.isRunning === false &&
      gameInfoResult.runningChanged &&
      Math.floor(gameInfoResult.gameInfo.id / 10) === LOL_ID
  );
};

export const openWindow = (windowName) => {
  overwolf.windows.obtainDeclaredWindow(windowName, (result) => {
    if (result.error) {
      throw new Error(result.error);
    }
    overwolf.windows.restore(result.window.id);
  });
};

export const closeWindow = (windowName: string) => {
  overwolf.windows.obtainDeclaredWindow(windowName, (result) => {
    if (result.error) {
      throw new Error(result.error);
    }
    overwolf.windows.close(result.window.id);
  });
};

export const toggleWindow = (windowName: string) => {
  overwolf.windows.obtainDeclaredWindow(windowName, (result) => {
    if (
      !result.success ||
      ['minimized', 'hidden', 'closed'].includes(result.window.stateEx)
    ) {
      overwolf.windows.restore(result.window.id);
    } else {
      overwolf.windows.minimize(result.window.id);
    }
  });
};

export const closeCurrentWindow = (): void => {
  overwolf.windows.getCurrentWindow((result) => {
    overwolf.windows.close(result.window.id);
  });
};

export const restoreCurrentWindow = (): void => {
  overwolf.windows.getCurrentWindow((result) => {
    overwolf.windows.restore(result.window.id);
  });
};

export const flashUntilFocus = (windowName: string): void => {
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

export const addLeagueLauncherListener = (onLaunched) => {
  overwolf.games.launchers.onLaunched.addListener((launcher) => {
    if (Math.floor(launcher.id / 10) === LEAGUE_LAUNCHER_ID) {
      onLaunched();
    }
  });

  overwolf.games.launchers.getRunningLaunchersInfo((res) => {
    if (isLeagueLauncherRunning(res)) {
      onLaunched();
    }
  });
};

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

      console.log('Successfully set League Launcher features');
      if (onReady) {
        onReady();
      }
    }
  );
};

export const setLeagueFeatures = (
  interestedInFeatures: string[],
  onReady?: () => void
) => {
  overwolf.games.events.setRequiredFeatures(interestedInFeatures, (info) => {
    if (!info.success) {
      return setTimeout(
        () => setLeagueFeatures(interestedInFeatures, onReady),
        2000
      );
    }

    console.log('Successfully set League features');
    if (onReady) {
      onReady();
    }
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
