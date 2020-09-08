import { Summoner } from '../riot/types';

export interface Credential {
  summonerName: string;
  platformId: string;
}

export interface Account {
  _id?: string;
  summoner: Summoner;
  authTokens: {
    token: string;
    expiresAt: Date;
  }[];
  islands: AccountIsland[];
  levels: AccountLevel[];
  trophies: AccountTrophy[];
  games: number;
  lastGameIds: number[];
  favoriteTrophyNames: string[];
}

export interface AccountIsland {
  name: string;
  status: 'open' | 'done';
}

export interface AccountLevel {
  name: string;
  island: string;
  status: 'active' | 'unlocked' | 'completed';
  unlockedAt: number;
}

export interface AccountTrophy {
  name: string;
  island: string;
  level: string;
  status: 'active' | 'completed';
  progress: number;
}
