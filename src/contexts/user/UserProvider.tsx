import { useState, FC, useEffect } from 'react';
import UserContext from './UserContext';
import { User } from './types';

const sampleUser: User = {
  islands: {
    hubIsland: {
      status: 'open',
      levels: {
        welcome: {
          status: 'active',
          trophies: {
            playstyle: {
              progress: 0
            }
          }
        },
        combat: {
          status: 'locked',
          trophies: {}
        },
        skills: {
          status: 'locked',
          trophies: {}
        },
        teamplay: {
          status: 'locked',
          trophies: {}
        },
        objectives: {
          status: 'locked',
          trophies: {}
        },
        epic: {
          status: 'locked',
          trophies: {}
        },
        special: {
          status: 'locked',
          trophies: {}
        }
      }
    },
    combatIsland: {
      status: 'closed',
      levels: {}
    }
  }
};

const UserProvider: FC = ({ children }) => {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    setTimeout(() => {
      setUser(sampleUser);
    }, 2000);
  }, []);

  const value = user;

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
