export interface Credential {
  summonerName: string;
  region: string;
}

export interface Account {
  summonerName: string;
  region: string;
  islands: {
    name: string;
    status: 'open' | 'closed' | 'done';
  }[];
  levels: {
    name: string;
    island: string;
    status: 'active' | 'unlocked' | 'locked' | 'completed';
  }[];
  trophies: {
    name: string;
    island: string;
    level: string;
    status: 'active' | 'completed';
    progress: number;
  }[];
}
