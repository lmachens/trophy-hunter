import { FC, useCallback, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import overwolf, {
  isLeagueRunning,
  getRunningGameInfo,
  getCurrentWindow,
  isWindowStateVisible,
  isLeagueGameId,
} from '../../api/overwolf';
import { OwAd } from '../../../typings/owAds';
import { log } from '../../api/logs';

const Container = styled.div`
  background: #2b2a30;
  height: 300px;
  min-height: 300px;
  width: 400px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${process.env.PUBLIC_DIR}/trophy-hunter-bg-logo.png);
  background-repeat: no-repeat;
  background-position: center;
`;

interface VideoAdsProps {
  ingame?: boolean;
  autoRefresh?: boolean;
}

const SEVEN_MINUTES = 7 * 60 * 1000;

const VideoAds: FC<VideoAdsProps> = ({
  ingame = false,
  autoRefresh = false,
}) => {
  const containerRef = useRef(null);
  const adsVisible = useRef<boolean>(undefined);
  const [owAd, setOwAd] = useState<OwAd>(null);
  const [timeoutStart, setTimeoutStart] = useState<number>(null);

  const refreshAd = useCallback(
    async (force = false) => {
      if (!owAd) {
        return;
      }
      const showAd = () => {
        if (
          adsVisible.current &&
          !force &&
          typeof adsVisible.current !== 'undefined'
        ) {
          return;
        }
        log(`Show ad (ingame: ${ingame})`);
        owAd.refreshAd(null);
        adsVisible.current = true;
      };
      const hideAd = () => {
        if (
          !adsVisible.current &&
          !force &&
          typeof adsVisible.current !== 'undefined'
        ) {
          return;
        }
        log(`Hide ad (ingame: ${ingame})`);
        owAd.removeAd();
        adsVisible.current = false;
      };

      const currentWindow = await getCurrentWindow();
      if (!isWindowStateVisible(currentWindow.stateEx)) {
        hideAd();
        return;
      }

      const runningGameInfo = await getRunningGameInfo();
      const leagueIsRunning = isLeagueRunning(runningGameInfo);
      log(`leagueIsRunning: ${leagueIsRunning} ingame: ${ingame}`);
      if (leagueIsRunning) {
        if (ingame) {
          if (runningGameInfo.isInFocus) {
            showAd();
          } else {
            hideAd();
          }
        } else {
          hideAd();
        }
      } else {
        showAd();
      }

      setTimeoutStart(Date.now());
    },
    [owAd, ingame]
  );

  useEffect(() => {
    if (!autoRefresh) {
      return;
    }

    let timeoutId = null;
    const refreshTimeout = () => {
      log('Start new ads timeout');

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => refreshAd(true), SEVEN_MINUTES);
    };
    refreshTimeout();

    const handleHotkeyPressed = () => {
      refreshTimeout();
    };
    const handleClick = () => {
      refreshTimeout();
    };

    overwolf.settings.hotkeys.onPressed.addListener(handleHotkeyPressed);
    window.addEventListener('click', handleClick);

    return () => {
      clearTimeout(timeoutId);
      overwolf.settings.hotkeys.onPressed.removeListener(handleHotkeyPressed);
      window.removeEventListener('click', handleClick);
    };
  }, [autoRefresh, timeoutStart]);

  useEffect(() => {
    const handleOwAdReady = () => {
      if (typeof globalThis.OwAd === 'undefined') {
        return;
      }
      log(`OwAd script loaded`);

      const owAd: OwAd = new globalThis.OwAd(containerRef.current, {
        size: { width: 400, height: 300 },
      });

      let owAdIsSet = false;
      const handleInternalRendered = () => {
        if (owAdIsSet) {
          return;
        }
        owAd.removeEventListener(
          'ow_internal_rendered',
          handleInternalRendered
        );

        setOwAd(owAd);
        log(`OwAd is ready`);
        owAdIsSet = true;
      };

      const handleDisplayAdLoaded = () => {
        log(`Display ad loaded`);
        setTimeoutStart(Date.now());
      };
      owAd.addEventListener('ow_internal_rendered', handleInternalRendered);
      owAd.addEventListener('display_ad_loaded', handleDisplayAdLoaded);
    };

    const script = document.createElement('script');
    script.src = 'https://content.overwolf.com/libs/ads/latest/owads.min.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = handleOwAdReady;

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const handleWindowStateChanged = async (
      state: overwolf.windows.WindowStateChangedEvent
    ) => {
      const currentWindow = await getCurrentWindow();
      if (state.window_id !== currentWindow.id) {
        return;
      }
      if (
        (isWindowStateVisible(state.window_previous_state_ex) &&
          !isWindowStateVisible(state.window_state_ex)) ||
        (!isWindowStateVisible(state.window_previous_state_ex) &&
          isWindowStateVisible(state.window_state_ex))
      ) {
        refreshAd();
      }
    };
    const handleGameInfoUpdated = (
      res: overwolf.games.GameInfoUpdatedEvent
    ) => {
      if (isLeagueGameId(res.gameInfo?.id)) {
        refreshAd();
      }
    };

    overwolf.windows.onStateChanged.addListener(handleWindowStateChanged);
    overwolf.games.onGameInfoUpdated.addListener(handleGameInfoUpdated);

    refreshAd();
    log(`Initialized window and game info listeners`);
    return () => {
      overwolf.windows.onStateChanged.removeListener(handleWindowStateChanged);
      overwolf.games.onGameInfoUpdated.removeListener(handleGameInfoUpdated);
    };
  }, [refreshAd]);

  return <Container ref={containerRef} />;
};

export default VideoAds;
