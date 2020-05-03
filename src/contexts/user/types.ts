interface Island {
  status: 'open' | 'closed' | 'done';
  trophiesCount: number;
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
}

export interface User {
  islands: {
    hubIsland: Island;
    combatIsland: Island;
    skillsIsland: Island;
    objectivesIsland: Island;
    teamworkIsland: Island;
    specialIsland: Island;
    epicIsland: Island;
  };
}
