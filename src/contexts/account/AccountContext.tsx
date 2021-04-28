import { createContext } from 'react';
import { Account } from '../../api/accounts';

interface AccountContextValue {
  account: Account;
  loading: boolean;
}

const AccountContext = createContext<AccountContextValue>({
  account: null,
  loading: true,
});

export default AccountContext;
