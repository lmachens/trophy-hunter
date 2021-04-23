import { FC, useEffect } from 'react';
import AccountContext from './AccountContext';
import { getAccount, getPublicAccount } from '../../api/accounts';
import { useQuery } from 'react-query';
import {
  setUserId,
  trackPageView,
  listenRouteChangeComplete,
} from '../../api/performance';
import { useRouter } from 'next/router';
import { normalizeQuery } from '../../api/utils/router';

const AccountProvider: FC = ({ children }) => {
  const { data: account, status } = useQuery('account', getAccount);
  const router = useRouter();
  const { summonerName, platformId } = normalizeQuery(router.query);

  const { data: publicAccount } = useQuery(
    ['publicAccount', summonerName, platformId],
    () => getPublicAccount({ summonerName, platformId }),
    {
      enabled: Boolean(summonerName && platformId),
    }
  );

  useEffect(() => {
    if (status === 'success') {
      if (account) {
        setUserId(`${account.summoner.name} (${account.summoner.platformId})`);
      } else {
        trackPageView(location.href);
      }
      listenRouteChangeComplete();
    }
  }, [account?._id, status]);

  const queryPrivateAccount =
    account?.summoner.name === summonerName &&
    account?.summoner.platformId === platformId;
  const targetAccount = (!queryPrivateAccount && publicAccount) || account;
  return (
    <AccountContext.Provider
      value={{
        account: targetAccount,
        loading: status === 'loading',
        isPersonalAccount: !!publicAccount,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export default AccountProvider;
