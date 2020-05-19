import { useContext } from 'react';
import AccountContext from './AccountContext';

const useAccount = () => {
  return useContext(AccountContext);
};

export default useAccount;
