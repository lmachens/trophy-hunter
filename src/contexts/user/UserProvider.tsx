import { useState, FC, useEffect } from 'react';
import UserContext from './UserContext';
import { Account, postLogin } from '../../api/accounts';

const UserProvider: FC = ({ children }) => {
  const [user, setUser] = useState<Account>(null);

  useEffect(() => {
    postLogin({ summonerName: 'sirlunchalot619', region: 'EUW' }).then(setUser);
  }, []);

  const value = user;

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
