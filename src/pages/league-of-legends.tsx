import { NextPage } from 'next';
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
import Help from '../components/help/Help';
import SpreadTheLove from '../components/help/SpreadTheLove';
import ARAMModal from '../components/modals/ARAMModal';

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
};

const LeagueOfLegends: NextPage = () => {
  const [isGarenaUser, , unsetIsGarenaUser] = usePersistentState(
    'isGarenaUser',
    null
  );
  const [sawARAMModal, setSawARAMModal] = usePersistentState(
    'sawARAMModal',
    false
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
  const { Main, Aside, hideProfile } = subpages[activeSubpage] || subpages.map;

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
      hideProfile={hideProfile}
    >
      <Main onQueryChange={setQueryParam} />
      {isGarenaUser && <GarenaModal onClose={() => unsetIsGarenaUser()} />}
      {!sawARAMModal && <ARAMModal onClose={() => setSawARAMModal(true)} />}
    </GameLayout>
  );
};

export default LeagueOfLegends;
