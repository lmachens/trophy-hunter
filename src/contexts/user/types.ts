export interface User {
  islands: {
    [islandName: string]: {
      status: 'open' | 'closed' | 'done';
      levels: {
        [levelName: string]: {
          status: 'active' | 'unlocked' | 'locked' | 'completed';
          trophies: {
            [trophyName: string]: {
              progress: number;
            };
          };
        };
      };
    };
  };
}
