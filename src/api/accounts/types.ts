export interface Credential {
  summonerName: string;
  region: string;
}

export interface Account {
  summonerName: string;
  region: string;
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
