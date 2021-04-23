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
import EnableOverlayModal from '../components/modals/EnableOverlayModal';
import { useAccount } from '../contexts/account';

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
  const { account } = useAccount();

  useCenterWindow();

  const [sawARAMModal, setSawARAMModal] = usePersistentState(
    'sawARAMModal',
    false
  );

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
      aside={<Aside account={account} onQueryChange={setQueryParam} />}
      onMainClick={() => {
        if (router.query.tool || router.query.level) {
          setQueryParam({ tool: undefined, level: undefined });
        }
      }}
      hideProfile={hideProfile}
    >
      <Main account={account} onQueryChange={setQueryParam} />
      <GarenaModal />
      {!sawARAMModal && <ARAMModal onClose={() => setSawARAMModal(true)} />}
      <EnableOverlayModal />
    </GameLayout>
  );
};

export default LeagueOfLegends;
