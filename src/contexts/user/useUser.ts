import { useContext } from 'react';
import UserContext from './UserContext';

const useUser = () => {
  return useContext(UserContext);
};

export default useUser;
