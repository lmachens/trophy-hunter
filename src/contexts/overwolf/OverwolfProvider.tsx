import { FC, useEffect } from 'react';
import OverwolfContext from './OverwolfContext';
import overwolf from '../../api/overwolf';
import { postLogin } from '../../api/accounts';
import { useMutation, queryCache } from 'react-query';

const LOL_LAUNCHER_ID = 10902;
const interestedInFeatures = [
  'game_flow',
  'summoner_info',
  'champ_select',
  'lcu_info',
  'lobby_info',
  'end_game',
];

const isLauncherRunning = (
  launcherInfo: overwolf.games.launchers.GetRunningLaunchersInfoResult
) => {
  return (
    launcherInfo?.launchers[0] &&
    Math.floor(launcherInfo.launchers[0].id / 10) === LOL_LAUNCHER_ID
  );
};

const OverwolfProvider: FC = ({ children }) => {
  const [login] = useMutation(postLogin, {
    onSuccess: () => {
      queryCache.refetchQueries('account');
    },
  });

  useEffect(() => {
    const setFeatures = () => {
      overwolf.games.launchers.events.setRequiredFeatures(
        LOL_LAUNCHER_ID,
        interestedInFeatures,
        (info) => {
          if (info.error) {
            return setTimeout(setFeatures, 2000);
          }

          overwolf.games.launchers.events.getInfo(
            LOL_LAUNCHER_ID,
            (response) => {
              if (response?.res.summoner_info) {
                const {
                  platform_id: platformId,
                  display_name: summonerName,
                } = response.res.summoner_info;

                login({ platformId, summonerName });
              }
            }
          );
        }
      );
    };

    const handleOnLaunched = () => {
      setTimeout(setFeatures, 1000);
    };

    overwolf.games.launchers.onLaunched.addListener(handleOnLaunched);

    overwolf.games.launchers.getRunningLaunchersInfo((res) => {
      if (isLauncherRunning(res)) {
        setTimeout(setFeatures, 1000);
      }
    });

    return () => {
      overwolf.games.launchers.onLaunched.removeListener(handleOnLaunched);
    };
  }, []);

  return (
    <OverwolfContext.Provider value={null}>{children}</OverwolfContext.Provider>
  );
};

export default OverwolfProvider;
