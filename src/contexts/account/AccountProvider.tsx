import { FC, useEffect } from 'react';
import AccountContext from './AccountContext';
import { getAccount } from '../../api/accounts';
import { useQuery } from 'react-query';
import {
  setUserId,
  trackPageView,
  listenRouteChangeComplete,
} from '../../api/performance';

const AccountProvider: FC = ({ children }) => {
  const { data: account, status } = useQuery('account', getAccount);

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

  return (
    <AccountContext.Provider value={{ account, loading: status === 'loading' }}>
      {children}
    </AccountContext.Provider>
  );
};

export default AccountProvider;
