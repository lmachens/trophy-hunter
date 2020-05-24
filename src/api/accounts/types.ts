import { Summoner } from '../riot/types';

export interface Credential {
  summonerName: string;
  platformId: string;
}

export interface Account {
  _id?: string;
  summoner: Summoner;
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
