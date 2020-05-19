import { useState, FC, useEffect } from 'react';
import AccountContext from './AccountContext';
import { Account, postLogin } from '../../api/accounts';

const AccountProvider: FC = ({ children }) => {
  const [account, setAccount] = useState<Account>(null);

  useEffect(() => {
    postLogin({ summonerName: 'sirlunchalot619', region: 'EUW' }).then(
      setAccount
    );
  }, []);

  const value = account;

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
};

export default AccountProvider;
