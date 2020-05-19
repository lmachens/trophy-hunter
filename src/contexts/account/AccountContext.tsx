import { createContext } from 'react';
import { Account } from '../../api/accounts';

const AccountContext = createContext<Account>(null);

export default AccountContext;
