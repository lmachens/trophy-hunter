import { NextPage } from 'next';
import GameLayout, { GameChildProps } from '../layouts/GameLayout';
import GarenaModal from '../components/modals/GarenaModal';
import useCenterWindow from '../hooks/useCenterWindow';
import Map from '../components/map/Map';
import MapOverview from '../components/map/MapOverview';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import Leaderboard from '../components/leaderboard/Leaderboard';
import LeaderboardOverview from '../components/leaderboard/LeaderboardOverview';
import History from '../components/history/History';
import HistoryOverview from '../components/history/HistoryOverview';
import Help from '../components/help/Help';
import SpreadTheLove from '../components/help/SpreadTheLove';
import EnableOverlayModal from '../components/modals/EnableOverlayModal';
import Profile from '../components/trophies/Profile';

const subpages: {
  [subpage: string]: {
    Main: (props: GameChildProps) => JSX.Element;
    Aside: (props: GameChildProps) => JSX.Element;
    hideProfile?: boolean;
  };
} = {
  map: {
    Main: Map,
    Aside: MapOverview,
  },
  leaderboard: {
    Main: Leaderboard,
    Aside: LeaderboardOverview,
  },
  history: {
    Main: History,
    Aside: HistoryOverview,
  },
  help: {
    Main: Help,
    Aside: SpreadTheLove,
    hideProfile: true,
  },
  profile: {
    Main: Map,
    Aside: HistoryOverview,
  },
};

const normalizeQuery = (query: ParsedUrlQuery) => {
  return Object.entries(query).reduce<NodeJS.Dict<string>>(
    (prev, [key, value]) => ({
      ...prev,
      [key]: Array.isArray(value) ? value[0] : value,
    }),
    {}
  );
};

const LeagueOfLegends: NextPage = () => {
  const router = useRouter();
  const { subpage = 'map', tool } = normalizeQuery(router.query);
  useCenterWindow();

  const setQueryParam = (query: ParsedUrlQuery) => {
    const newQuery = { ...router.query, ...query };
    Object.keys(newQuery).forEach(
      (key) => newQuery[key] === undefined && delete newQuery[key]
    );

    router.push({
      query: newQuery,
    });
  };

  const { Main, Aside, hideProfile } = subpages[subpage];

  return (
    <GameLayout
      activeTool={tool}
      onToolClick={(newTool) => {
        setQueryParam({
          tool: newTool === tool ? undefined : newTool,
          level: undefined,
        });
      }}
      aside={
        <>
          {!hideProfile && <Profile />}
          <Aside onQueryChange={setQueryParam} />
        </>
      }
      onMainClick={() => {
        if (router.query.tool || router.query.level) {
          setQueryParam({ tool: undefined, level: undefined });
        }
      }}
    >
      <Main onQueryChange={setQueryParam} />
      <GarenaModal />
      <EnableOverlayModal />
    </GameLayout>
  );
};

export default LeagueOfLegends;
