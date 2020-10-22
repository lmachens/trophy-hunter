import { NextPage } from 'next';
import styled from '@emotion/styled';
import overwolf from '../api/overwolf';
import Head from 'next/head';
import { log, warn } from '../api/logs';
import { VideoAds } from '../components/ads';
import Profile from '../components/trophies/Profile';
import { Islands } from '../components/islands';
import islands from '../components/islands/islands';
import { useAccount } from '../contexts/account';
import { useEffect, useState } from 'react';
import Favorites from '../components/filters/Favorites';
import useAvailableTrophies from '../contexts/account/useAvailableTrophies';
import Combat from '../components/filters/Combat';
import Skills from '../components/filters/Skills';
import Teamwork from '../components/filters/Teamwork';
import Objectives from '../components/filters/Objectives';
import Special from '../components/filters/Special';
import Epic from '../components/filters/Epic';
import Origin from '../components/filters/Origin';
import usePersistentState from '../hooks/usePersistentState';
import { TROPHY_PROGRESS } from '../api/overwolf/live';
import TrophyListItem from '../components/trophies/TrophyListItem';
import Status from '../components/common/Status';
import Grow from '../components/common/Grow';
import Hotkey from '../components/headers/HotKey';
import useHotkey from '../hooks/useHotkey';
import Header from '../components/headers/Header';

overwolf.extensions.current.getManifest((manifest) =>
  log(`Running v${manifest.meta.version}`)
);

const Container = styled.div`
  display: flex;
  height: 100vh;

  main {
    padding: 74px 20px 20px 20px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  aside {
    padding: 48px 20px 20px 20px;
    background: #1f1f1f;
    border-left: 1px solid #77777a;
    width: 440px;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  button {
    margin-right: 16px;
  }
`;

const SmallIslands = styled(Islands)`
  margin: 0;
  margin-left: 12px;
  zoom: 0.48;
`;

const List = styled.section`
  margin-top: 25px;
  overflow: auto;
  max-height: 100%;
  flex-grow: 1;

  > div {
    background-color: #3f3e43;
  }
`;

const allFilters = ['favorites', ...islands.map((island) => island.name)];
const SecondScreen: NextPage = () => {
  const { account } = useAccount();
  const [filterIndex, setFilterIndex] = usePersistentState(
    'last-filter-index',
    -1
  );
  const [nextFilterIndex, setNextFilterIndex] = useState(-1);
  const levels = account?.levels || [];
  const availableTrophies = useAvailableTrophies();
  const [trophyProgress] = usePersistentState<{ [trophyName: string]: number }>(
    TROPHY_PROGRESS,
    {}
  );
  const nextPageHotkey = useHotkey('next_page_trophy_hunter');
  const showHideHotkey = useHotkey('show_second_screen_trophy_hunter');
  const filters = filterIndex === -1 ? [] : allFilters[filterIndex];

  const trophies = availableTrophies.filter(
    (trophy) =>
      filters.includes(trophy.category) ||
      (filters.includes('favorites') &&
        account.favoriteTrophyNames.includes(trophy.name))
  );

  const hasFavorites = availableTrophies.some((trophy) =>
    account.favoriteTrophyNames.includes(trophy.name)
  );
  useEffect(() => {
    const getNextIndex = (index) => {
      let nextFilterIndex = (index + 1) % allFilters.length;
      if (nextFilterIndex === allFilters.indexOf('favorites')) {
        if (hasFavorites) {
          return nextFilterIndex;
        }
        nextFilterIndex++;
      }
      while (nextFilterIndex < allFilters.length * 2) {
        const newFilterIndex = nextFilterIndex % allFilters.length;
        if (newFilterIndex === allFilters.indexOf('favorites')) {
          if (hasFavorites) {
            return newFilterIndex;
          }
        } else {
          const hasItems = availableTrophies.some(
            (trophy) => trophy.category === allFilters[newFilterIndex]
          );
          if (hasItems) {
            return newFilterIndex;
          }
        }
        nextFilterIndex++;
      }

      return index;
    };
    const nextIndex = getNextIndex(filterIndex);
    if (filterIndex === -1) {
      setFilterIndex(nextIndex);
      getNextIndex(nextIndex);
    } else {
      setNextFilterIndex(nextIndex);
    }
  }, [filterIndex, hasFavorites, availableTrophies]);

  useEffect(() => {
    overwolf.utils.getMonitorsList((result) => {
      if (result.displays.length < 2) {
        warn('[second-screen] Not enough displays');
        return;
      }
      const secondaryDisplay = result.displays.find(
        (display) => !display.is_primary
      );
      if (!secondaryDisplay) {
        warn('[second-screen] No secondary display found');
        return;
      }
      overwolf.windows.changePosition(
        'second_screen',
        secondaryDisplay.x + Math.round((secondaryDisplay.width - 1335) / 2),
        secondaryDisplay.y + Math.round((secondaryDisplay.height - 750) / 2)
      );
    });
  }, []);

  useEffect(() => {
    const handleHotkeyPressed = (
      event: overwolf.settings.hotkeys.OnPressedEvent
    ) => {
      if (event.name === 'next_page_trophy_hunter') {
        setFilterIndex(nextFilterIndex);
      }
    };
    overwolf.settings.hotkeys.onPressed.addListener(handleHotkeyPressed);

    return () => {
      overwolf.settings.hotkeys.onPressed.removeListener(handleHotkeyPressed);
    };
  }, [nextFilterIndex]);

  return (
    <>
      <Head>
        <title>Trophy Hunter - Second Screen</title>
      </Head>
      <Container>
        <Header resizable>
          <Status />
          <Grow />
          <Hotkey hint="Next Page" value={nextPageHotkey} />
          <Hotkey hint="Show/Hide" value={showHideHotkey} />
          <Grow />
        </Header>
        <main>
          <div>
            <Favorites
              selected={filterIndex === allFilters.indexOf('favorites')}
              disabled={!hasFavorites}
              onClick={() => setFilterIndex(allFilters.indexOf('favorites'))}
            />
            <Combat
              selected={filterIndex === allFilters.indexOf('combat')}
              disabled={
                !availableTrophies.some(
                  (trophy) => trophy.category === 'combat'
                )
              }
              onClick={() => setFilterIndex(allFilters.indexOf('combat'))}
            />
            <Skills
              selected={filterIndex === allFilters.indexOf('skills')}
              disabled={
                !availableTrophies.some(
                  (trophy) => trophy.category === 'skills'
                )
              }
              onClick={() => setFilterIndex(allFilters.indexOf('skills'))}
            />
            <Teamwork
              selected={filterIndex === allFilters.indexOf('teamwork')}
              disabled={
                !availableTrophies.some(
                  (trophy) => trophy.category === 'teamwork'
                )
              }
              onClick={() => setFilterIndex(allFilters.indexOf('teamwork'))}
            />
            <Objectives
              selected={filterIndex === allFilters.indexOf('objectives')}
              disabled={
                !availableTrophies.some(
                  (trophy) => trophy.category === 'objectives'
                )
              }
              onClick={() => setFilterIndex(allFilters.indexOf('objectives'))}
            />
            <Special
              selected={filterIndex === allFilters.indexOf('special')}
              disabled={
                !availableTrophies.some(
                  (trophy) => trophy.category === 'special'
                )
              }
              onClick={() => setFilterIndex(allFilters.indexOf('special'))}
            />
            <Epic
              selected={filterIndex === allFilters.indexOf('epic')}
              disabled={
                !availableTrophies.some((trophy) => trophy.category === 'epic')
              }
              onClick={() => setFilterIndex(allFilters.indexOf('epic'))}
            />
            <Origin
              selected={filterIndex === allFilters.indexOf('hub')}
              disabled={
                !availableTrophies.some((trophy) => trophy.category === 'hub')
              }
              onClick={() => setFilterIndex(allFilters.indexOf('hub'))}
            />
          </div>
          <List>
            {trophies.map((trophy) => (
              <TrophyListItem
                trophy={trophy}
                key={trophy.name}
                borderless
                progress={trophyProgress[trophy.name]}
              />
            ))}
          </List>
        </main>
        <aside>
          <Profile />
          <SmallIslands>
            {islands.map(({ name, Component: Island }) => (
              <Island
                key={name}
                status={
                  account?.islands.find(
                    (accountIsland) => accountIsland.name === name
                  )?.status || 'closed'
                }
                levels={levels}
                onLevelClick={() => setFilterIndex(allFilters.indexOf(name))}
              />
            ))}
          </SmallIslands>
          <VideoAds showIngame />
        </aside>
      </Container>
    </>
  );
};

export default SecondScreen;
