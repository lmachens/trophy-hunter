import { FC, useEffect } from 'react';
import AccountContext from './AccountContext';
import { getAccount } from '../../api/accounts';
import { useQuery } from 'react-query';
import { setUserId } from '../../api/performance';

const AccountProvider: FC = ({ children }) => {
  const { data: account, status } = useQuery('account', getAccount);

  useEffect(() => {
    if (account) {
      setUserId(`${account.summoner.name} (${account.summoner.platformId})`);
    }
  }, [account?._id]);

  return (
    <AccountContext.Provider value={{ account, loading: status === 'loading' }}>
      {children}
    </AccountContext.Provider>
  );
};

export default AccountProvider;
