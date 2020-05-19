import { FC } from 'react';
import AccountContext from './AccountContext';
import { getAccount } from '../../api/accounts';
import { useQuery } from 'react-query';

const AccountProvider: FC = ({ children }) => {
  const { data: account, status } = useQuery('account', getAccount);

  return (
    <AccountContext.Provider value={{ account, loading: status === 'loading' }}>
      {children}
    </AccountContext.Provider>
  );
};

export default AccountProvider;
