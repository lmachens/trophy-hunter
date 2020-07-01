import { NextPage } from 'next';
import { InGameHeader } from '../components/headers';
import styled from '@emotion/styled';
import AvailableTrophies from '../components/trophies/AvailableTrophies';
import { VideoAds } from '../components/ads';
import Grow from '../components/common/Grow';
import SpecialProgress from '../components/trophies/special/SpecialProgress';
import { useState, useEffect } from 'react';
import Button from '../components/common/Button';
import { keyframes } from '@emotion/core';
import useHotkey from '../hooks/useHotkey';
import {
  Trophy,
  ActivePlayer,
  AllPlayers,
  Events,
  GameData,
  TrophyData,
} from '../components/trophies/types';
import * as levels from '../components/islands/levels';
import { Level } from '../components/levels/types';
import { useQuery } from 'react-query';
import { setLocalStorageItem, getLocalStorageItem } from '../api/utils/storage';
import { getAccount } from '../api/accounts';
import overwolf, { openWindow, setLeagueFeatures } from '../api/overwolf';
import { parseJSON } from '../api/utils/json';
import usePersistentState from '../hooks/usePersistentState';

const ConnectionStatus = styled.div`
  min-height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  padding: 48px 20px 20px 20px;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const ConnectionProgress = styled(SpecialProgress)`
  width: 23px;
  height: 62px;
  opacity: ${(props) => (props.progress === 1 ? 0 : 1)};
  transform: ${(props) =>
    props.progress === 1 ? 'translateY(-20px) scale(0.5)' : 'none'};
  transition: opacity 2s, transform 2s;
`;

const Status = styled.div<{
  progress: number;
}>`
  opacity: ${(props) => (props.progress === 1 ? 0 : 1)};
  transform: ${(props) =>
    props.progress === 1 ? 'translateY(-20px)' : 'none'};
  transition: opacity 2s, transform 2s;
`;

const appear = keyframes`
  from {
    opacity: 0;
    transform: translateY(1.2rem);
  }

  to {
    opacity: 1;
    transform: none;
  }
`;

const Motivation = styled.div`
  font-size: 1.2rem;
  overflow: hidden;
`;

const Appear = styled.div`
  animation: ${appear} ease 2s 1;
  animaton-delay: 1s;
`;

const GrowFlex = styled(Grow)`
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const INTERESTED_IN_LEAGUE_FEATURES = ['live_client_data'];

const InGame: NextPage = () => {
  const hotkey = useHotkey();
  const [progress, setProgress] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState('connecting');
  const [activePlayer, setActivePlayer] = useState<ActivePlayer>(null);
  const [allPlayers, setAllPlayers] = useState<AllPlayers>(null);
  const [events, setEvents] = useState<Events>([]);
  const [gameData, setGameData] = useState<GameData>(null);
  const [trophyData, setTrophyData] = useState<TrophyData>({});
  const [trophies, setTrophies] = useState<Trophy[]>(null);
  const { data: account } = useQuery('in-game-account', getAccount, {
    cacheTime: 0,
  });
  const [trophyProgress, setTrophyProgress] = useState<
    { trophy: Trophy; progress: number }[]
  >([]);
  const [notifiedNear, setNotifiedNear] = useState<string[]>([]);
  const [notifiedCompleted, setNotifiedCompleted] = useState<string[]>([]);
  const [showTrophyNearCompletion] = usePersistentState(
    'trophyNearCompletion',
    true
  );
  const [showTrophyCompleted] = usePersistentState('trophyCompleted', false);

  useEffect(() => {
    if (account) {
      console.log('Account is ready');
      setProgress((progress) => progress + 0.5);
    }
  }, [account]);

  useEffect(() => {
    if (progress !== 1) {
      return;
    }
    const timeoutId = setTimeout(() => {
      setConnectionStatus('connected');
    }, 2000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [progress]);

  useEffect(() => {
    if (connectionStatus !== 'connected') {
      return;
    }
    const timeoutId = setTimeout(() => {
      setConnectionStatus('done');
    }, 2000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [connectionStatus]);

  useEffect(() => {
    const handleInfoUpdates2 = (
      infoUpdate: overwolf.games.events.InfoUpdates2Event
    ) => {
      if (infoUpdate.feature !== 'live_client_data') {
        return;
      }

      const activePlayer = parseJSON(
        infoUpdate.info.live_client_data.active_player
      );
      if (activePlayer) {
        setActivePlayer(activePlayer);
      }

      const allPlayers = parseJSON(
        infoUpdate.info.live_client_data.all_players
      );
      if (allPlayers) {
        setAllPlayers(allPlayers);
      }
      const gameData = parseJSON(infoUpdate.info.live_client_data.game_data);
      if (gameData) {
        setGameData(gameData);
      }
      const events = parseJSON(infoUpdate.info.live_client_data.events) || {};
      if (events?.Events) {
        setEvents(events.Events);
      }
    };

    overwolf.games.events.onInfoUpdates2.addListener(handleInfoUpdates2);
    setTimeout(
      () =>
        setLeagueFeatures(INTERESTED_IN_LEAGUE_FEATURES, () => {
          setProgress((progress) => progress + 0.5);
        }),
      1000
    );

    return () => {
      overwolf.games.events.onInfoUpdates2.removeListener(handleInfoUpdates2);
    };
  }, []);

  useEffect(() => {
    if (!account) {
      return;
    }
    const activeLevels = account.levels.filter(
      (level) => level.status === 'active'
    );

    const trophies = activeLevels.reduce<Trophy[]>((trophies, accountLevel) => {
      const level = levels[accountLevel.name] as Level;
      return [
        ...trophies,
        ...level.trophies.filter((trophy) => {
          const accountTrophy = account.trophies.find(
            (accountTrophy) => accountTrophy.name === trophy.name
          );

          return accountTrophy?.status !== 'completed';
        }),
      ];
    }, []);

    console.log(`Can achieve ${trophies.length} trophies`, trophies);

    setTrophies(trophies);
  }, [account]);

  useEffect(() => {
    if (!trophies || !gameData?.gameTime) {
      return;
    }

    const trophyDataClone = { ...trophyData };
    const achievedTrophies = trophies
      .map((trophy) => ({
        trophy,
        progress: Math.min(
          1,
          trophy.checkLive?.({
            activePlayer,
            allPlayers,
            gameData,
            events,
            trophyData: trophyDataClone,
            account,
          }) || 0
        ),
      }))
      .filter(({ progress }) => progress > 0);

    setTrophyData(trophyDataClone);
    if (achievedTrophies.length === 0) {
      return;
    }
    setTrophyProgress((progress) => [
      ...achievedTrophies,
      ...progress.filter(
        (progressTrophy) =>
          !achievedTrophies.find(
            (achievedTrophy) =>
              achievedTrophy.trophy.name === progressTrophy.trophy.name
          )
      ),
    ]);
  }, [gameData?.gameTime]);

  useEffect(() => {
    const notificateNearTrophies = showTrophyNearCompletion
      ? trophyProgress.filter(
          ({ progress, trophy }) =>
            progress >= 0.8 &&
            progress < 1 &&
            !notifiedNear.includes(trophy.name)
        )
      : [];

    if (notificateNearTrophies.length > 0) {
      setNotifiedNear((notifiedNear) => [
        ...notifiedNear,
        ...notificateNearTrophies.map((trophy) => trophy.trophy.name),
      ]);
    }

    const notificateCompleteTrophies = showTrophyCompleted
      ? trophyProgress.filter(
          ({ progress, trophy }) =>
            progress === 1 && !notifiedCompleted.includes(trophy.name)
        )
      : [];
    if (notificateCompleteTrophies.length > 0) {
      setNotifiedCompleted((notifiedCompleted) => [
        ...notifiedCompleted,
        ...notificateCompleteTrophies.map((trophy) => trophy.trophy.name),
      ]);
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

    setLocalStorageItem('notifications', [
      ...notifications,
      ...notificateTrophies.map(({ trophy, progress }) => ({
        trophyName: trophy.name,
        progress,
      })),
    ]);
    openWindow('notification');
  }, [trophyProgress]);

  return (
    <Container>
      <InGameHeader />
      {connectionStatus !== 'done' && (
        <ConnectionStatus>
          {connectionStatus === 'connecting' ? (
            <>
              <ConnectionProgress progress={progress} />
              <Status progress={progress}>
                {progress < 1 ? 'Connecting to match' : 'Connected'}
              </Status>
            </>
          ) : (
            <>
              <Motivation>
                <Appear>GO GET THEM ALL!</Appear>
              </Motivation>
              <div>
                Hit {hotkey} or{' '}
                <Button
                  onClick={() =>
                    overwolf.windows.getCurrentWindow((result) => {
                      overwolf.windows.minimize(result.window.id);
                    })
                  }
                >
                  Click here
                </Button>{' '}
                to minimize
              </div>
            </>
          )}
        </ConnectionStatus>
      )}
      <GrowFlex>
        <AvailableTrophies trophyProgress={trophyProgress} />
      </GrowFlex>
      <VideoAds />
    </Container>
  );
};

export default InGame;
