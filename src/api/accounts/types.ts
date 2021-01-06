import { Category } from '../../components/trophies/types';
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
  lastMigrationAt?: Date;
  trophiesCompleted: number;
  rank?: number;
}

export interface SeasonAccount {
  season: string;
  summoner: Summoner;
  islands: AccountIsland[];
  levels: AccountLevel[];
  trophies: AccountTrophy[];
  games: number;
  lastGameIds: number[];
  trophiesCompleted: number;
  rank?: number;
}

export interface AccountIsland {
  name: string;
  status: 'open' | 'done';
}

export interface AccountLevel {
  name: string;
  island: Category;
  status: 'active' | 'unlocked' | 'completed';
  unlockedAt: number;
}

export interface AccountTrophy {
  name: string;
  island: Category;
  level: string;
  status: 'active' | 'completed';
  progress: number;
  progressDetails: any;
}

export type Ranking = {
  summonerName: string;
  profileIconId: number;
  islands: string[];
  trophiesCompleted: number;
};
