import { createContext } from 'react';
import { Account } from '../../api/accounts';

const UserContext = createContext<Account>(null);

export default UserContext;
