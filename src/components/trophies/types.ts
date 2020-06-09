import { FC, SVGProps } from 'react';
import { Match, MatchTimeline } from '../../api/riot/types';
import { Account } from '../../api/accounts';

export interface Trophy {
  name: string;
  title: string;
  description: string;
  level: string;
  island: string;
  ProgressIcon: FC<ProgressProps>;
  maxProgress?: number;
  checkProgress(props: {
    match: Match;
    timeline: MatchTimeline;
    account: Account;
  }): number;
  checkLive?(props: {
    activePlayer: ActivePlayer;
    allPlayers: AllPlayers;
    events: Events;
    gameData: GameData;
    trophyData: TrophyData;
    account: Account;
  }): number;
}

export interface Ability {
  abilityLevel: number;
  displayName: string;
  id: string;
  rawDescription: string;
  rawDisplayName: string;
}

export interface Rune {
  displayName: string;
  id: number;
  rawDescription: string;
  rawDisplayName: string;
}

export interface SummonerSpell {
  displayName: string;
  rawDescription: string;
  rawDisplayName: string;
}

export interface ActivePlayer {
  abilities: {
    E: Ability;
    Passive: {
      displayName: string;
      id: string;
      rawDescription: string;
      rawDisplayName: string;
    };
    Q: Ability;
    R: Ability;
    W: Ability;
  };
  championStats: {
    abilityPower: number;
    armor: number;
    armorPenetrationFlat: number;
    armorPenetrationPercent: number;
    attackDamage: number;
    attackRange: number;
    attackSpeed: number;
    bonusArmorPenetrationPercent: number;
    bonusMagicPenetrationPercent: number;
    cooldownReduction: number;
    critChance: number;
    critDamage: number;
    currentHealth: number;
    healthRegenRate: number;
    lifeSteal: number;
    magicLethality: number;
    magicPenetrationFlat: number;
    magicPenetrationPercent: number;
    magicResist: number;
    maxHealth: number;
    moveSpeed: number;
    physicalLethality: number;
    resourceMax: number;
    resourceRegenRate: number;
    resourceType: string;
    resourceValue: number;
    spellVamp: number;
    tenacity: number;
  };
  currentGold: number;
  fullRunes: {
    generalRunes: Rune[];
    keystone: Rune;
    primaryRuneTree: Rune;
    secondaryRuneTree: Rune;
    statRunes: {
      id: number;
      rawDescription: string;
    }[];
  };
  level: number;
  summonerName: string;
}

export interface Player {
  championName: string;
  isBot: boolean;
  isDead: boolean;
  items: unknown[];
  level: number;
  position: string;
  rawChampionName: string;
  respawnTimer: number;
  runes: {
    keystone: Rune;
    primaryRuneTree: Rune;
    secondaryRuneTree: Rune;
  };
  scores: {
    assists: number;
    creepScore: number;
    deaths: number;
    kills: number;
    wardScore: number;
  };
  skinID: number;
  summonerName: string;
  summonerSpells: {
    summonerSpellOne: SummonerSpell;
    summonerSpellTwo: SummonerSpell;
  };
  team: string;
}

export type AllPlayers = Player[];

export interface Event {
  EventID: number;
  EventName: string;
  EventTime: number;
  VictimName?: string;
  Assisters?: string[];
  KillerName?: string;
  KillStreak?: number;
  Acer?: string;
  AcingTeam?: string;
}

export type Events = Event[];

export interface GameData {
  gameMode: string;
  gameTime: number;
  mapName: string;
  mapNumber: number;
  mapTerrain: string;
}

export interface TrophyData {
  [key: string]: any;
}

export interface ProgressProps extends SVGProps<SVGSVGElement> {
  progress: number;
}
