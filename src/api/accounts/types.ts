export interface Credential {
  summonerName: string;
  region: string;
}

export interface Account {
  _id?: string;
  summonerName: string;
  region: string;
  islands: {
    name: string;
    status: 'open' | 'done' | 'closed';
  }[];
  levels: {
    name: string;
    island: string;
    status: 'active' | 'unlocked' | 'completed' | 'locked';
  }[];
  trophies: {
    name: string;
    island: string;
    level: string;
    status: 'active' | 'completed';
    progress: number;
  }[];
}
