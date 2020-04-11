import { createContext } from 'react';
import { User } from './types';

const UserContext = createContext<User>(null);

export default UserContext;
