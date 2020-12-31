import { NextPage } from 'next';
import { WelcomeGuide } from '../components/guides';
import GameLayout, { GameChildProps } from '../layouts/GameLayout';
import usePersistentState from '../hooks/usePersistentState';
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

const subpages: {
  [subpage: string]: {
    Main: (props: GameChildProps) => JSX.Element;
    Aside: (props: GameChildProps) => JSX.Element;
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
};

const LeagueOfLegends: NextPage = () => {
  const [isGarenaUser, , unsetIsGarenaUser] = usePersistentState(
    'isGarenaUser',
    null
  );
  const router = useRouter();
  const { subpage = 'map', tool } = router.query;
  useCenterWindow();

  const activeTool = tool === 'settings' || tool === 'collection' ? tool : null;

  const setQueryParam = (query: ParsedUrlQuery) => {
    const newQuery = { ...router.query, ...query };
    Object.keys(newQuery).forEach(
      (key) => newQuery[key] === undefined && delete newQuery[key]
    );

    router.push({
      query: newQuery,
    });
  };

  const activeSubpage = typeof subpage === 'string' ? subpage : null;
  const { Main, Aside } = subpages[activeSubpage] || subpages.map;

  return (
    <GameLayout
      activeTool={activeTool}
      onToolClick={(tool) => {
        setQueryParam({
          tool: activeTool === tool ? undefined : tool,
          level: undefined,
        });
      }}
      aside={<Aside onQueryChange={setQueryParam} />}
      onMainClick={() => {
        if (router.query.tool || router.query.level) {
          setQueryParam({ tool: undefined, level: undefined });
        }
      }}
    >
      <Main onQueryChange={setQueryParam} />
      <WelcomeGuide />
      {isGarenaUser && <GarenaModal onClose={() => unsetIsGarenaUser()} />}
    </GameLayout>
  );
};

export default LeagueOfLegends;
