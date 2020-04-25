import { useState, FC, useEffect } from 'react';
import UserContext from './UserContext';
import { User } from './types';

const sampleUser: User = {
  islands: {
    hubIsland: {
      status: 'open',
      levels: {
        welcome: {
          status: 'completed',
          trophies: {
            playstyle: {
              progress: 1
            }
          }
        },
        combat: {
          status: 'completed',
          trophies: {}
        },
        skills: {
          status: 'active',
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
      status: 'open',
      levels: {
        lvl1: {
          status: 'active',
          trophies: {}
        }
      }
    }
  }
};

const UserProvider: FC = ({ children }) => {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    setTimeout(() => {
      setUser(sampleUser);
    }, 1000);
  }, []);

  const value = user;

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
