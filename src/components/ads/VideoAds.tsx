import { FC, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import overwolf, {
  isLeagueLaunched,
  isLeagueClosed,
  isLeagueRunning,
} from '../../api/overwolf';
import { OwAd } from '../../../typings/owAds';

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
  showIngame: boolean;
}

const VideoAds: FC<VideoAdsProps> = ({ showIngame }) => {
  const containerRef = useRef(null);
  const [owAd, setOwAd] = useState<OwAd>(null);

  useEffect(() => {
    const handleOwAdReady = () => {
      if (typeof globalThis.OwAd === 'undefined') {
        return;
      }
      console.log(`OwAd ready`);

      const owAd: OwAd = new globalThis.OwAd(containerRef.current, {
        size: { width: 400, height: 300 },
      });

      const handleInternalRendered = () => {
        owAd.removeEventListener(
          'ow_internal_rendered',
          handleInternalRendered
        );

        setOwAd(owAd);
      };

      owAd.addEventListener('ow_internal_rendered', handleInternalRendered);
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
    if (!owAd) {
      return;
    }
    const handleWindowStateChanged = (
      state: overwolf.windows.WindowStateChangedEvent
    ): void => {
      overwolf.windows.getCurrentWindow((res) => {
        if (state && state.window_id === res.window.id) {
          // when state changes to minimized, call removeAd()
          if (state.window_state === 'minimized') {
            owAd.removeAd();
          }
          // when state changes from minimized to normal, call refreshAd()
          else if (
            state.window_previous_state === 'minimized' &&
            state.window_state === 'normal'
          ) {
            if (showIngame) {
              owAd.refreshAd(null);
            } else {
              overwolf.games.getRunningGameInfo((res) => {
                if (!isLeagueRunning(res)) {
                  owAd.refreshAd(null);
                }
              });
            }
          }
        }
      });
    };
    overwolf.windows.onStateChanged.addListener(handleWindowStateChanged);

    return () => {
      overwolf.windows.onStateChanged.removeListener(handleWindowStateChanged);
    };
  }, [showIngame, owAd]);

  useEffect(() => {
    if (!owAd) {
      return;
    }

    const handleGameInfoUpdated = (
      res: overwolf.games.GameInfoUpdatedEvent
    ) => {
      if (
        showIngame &&
        isLeagueRunning(res.gameInfo) &&
        !res.gameInfo?.isInFocus
      ) {
        owAd.removeAd();
        return;
      }

      if (isLeagueLaunched(res)) {
        owAd.removeAd();
      } else if (isLeagueClosed(res)) {
        owAd.refreshAd(null);
      }
    };

    overwolf.games.onGameInfoUpdated.addListener(handleGameInfoUpdated);

    overwolf.games.getRunningGameInfo((res) => {
      if (!showIngame && isLeagueRunning(res)) {
        owAd.removeAd();
      }
    });

    return () => {
      overwolf.games.onGameInfoUpdated.removeListener(handleGameInfoUpdated);
    };
  }, [showIngame, owAd]);

  return <Container ref={containerRef} />;
};

export default VideoAds;
