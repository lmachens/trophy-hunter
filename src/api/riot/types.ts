export type TeamId = 100 | 200;

export interface Summoner {
  platformId: string;
  accountId: string;
  profileIconId?: number;
  revisionDate: number;
  name: string;
  id: string;
  puuid: string;
  summonerLevel: number;
}

export type Position = {
  x: number;
  y: number;
};

export type Match = {
  metadata: {
    dataVersion: string;
    matchId: string;
    participants: string[];
  };
  info: {
    gameCreation: number;
    gameDuration: number;
    gameId: number;
    gameMode: string;
    gameName: string;
    gameStartTimestamp: number;
    gameType: string;
    gameVersion: string;
    mapId: number;
    participants: Participant[];
    platformId: string;
    queueId: number;
    teams: {
      bans: {
        championId: number;
        pickTurn: number;
      }[];
      objectives: {
        baron: {
          first: boolean;
          kills: number;
        };
        champion: {
          first: boolean;
          kills: number;
        };
        dragon: {
          first: boolean;
          kills: number;
        };
        inhibitor: {
          first: boolean;
          kills: number;
        };
        riftHerald: {
          first: boolean;
          kills: number;
        };
        tower: {
          first: boolean;
          kills: number;
        };
      };
      teamId: TeamId;
      win: boolean;
    }[];
  };
};

export type Participant = {
  assists: number;
  baronKills: number;
  bountyLevel: number;
  champExperience: number;
  champLevel: number;
  championId: number;
  championName: string;
  championTransform: number;
  consumablesPurchased: number;
  damageDealtToBuildings: number;
  damageDealtToObjectives: number;
  damageDealtToTurrets: number;
  damageSelfMitigated: number;
  deaths: number;
  detectorWardsPlaced: number;
  doubleKills: number;
  dragonKills: number;
  firstBloodAssist: boolean;
  firstBloodKill: boolean;
  firstTowerAssist: boolean;
  firstTowerKill: boolean;
  gameEndedInEarlySurrender: boolean;
  gameEndedInSurrender: boolean;
  goldEarned: number;
  goldSpent: number;
  individualPosition: string;
  inhibitorKills: number;
  inhibitorsLost: number;
  item0: number;
  item1: number;
  item2: number;
  item3: number;
  item4: number;
  item5: number;
  item6: number;
  itemsPurchased: number;
  killingSprees: number;
  kills: number;
  lane: string;
  largestCriticalStrike: number;
  largestKillingSpree: number;
  largestMultiKill: number;
  longestTimeSpentLiving: number;
  magicDamageDealt: number;
  magicDamageDealtToChampions: number;
  magicDamageTaken: number;
  neutralMinionsKilled: number;
  nexusKills: number;
  nexusLost: number;
  objectivesStolen: number;
  objectivesStolenAssists: number;
  participantId: number;
  pentaKills: number;
  perks: {
    statPerks: {
      defense: number;
      flex: number;
      offense: number;
    };
    styles: {
      description: 'primaryStyle' | 'subStyle';
      selections: {
        perk: number;
        var1: number;
        var2: number;
        var3: number;
      }[];

      style: number;
    }[];
  };
  physicalDamageDealt: number;
  physicalDamageDealtToChampions: number;
  physicalDamageTaken: number;
  profileIcon: number;
  puuid: string;
  quadraKills: number;
  riotIdName: string;
  riotIdTagline: string;
  role: string;
  sightWardsBoughtInGame: number;
  spell1Casts: number;
  spell2Casts: number;
  spell3Casts: number;
  spell4Casts: number;
  summoner1Casts: number;
  summoner1Id: number;
  summoner2Casts: number;
  summoner2Id: number;
  summonerId: string;
  summonerLevel: number;
  summonerName: string;
  teamEarlySurrendered: boolean;
  teamId: TeamId;
  teamPosition: string;
  timeCCingOthers: number;
  timePlayed: number;
  totalDamageDealt: number;
  totalDamageDealtToChampions: number;
  totalDamageShieldedOnTeammates: number;
  totalDamageTaken: number;
  totalHeal: number;
  totalHealsOnTeammates: number;
  totalMinionsKilled: number;
  totalTimeCCDealt: number;
  totalTimeSpentDead: number;
  totalUnitsHealed: number;
  tripleKills: number;
  trueDamageDealt: number;
  trueDamageDealtToChampions: number;
  trueDamageTaken: number;
  turretKills: number;
  turretsLost: number;
  unrealKills: number;
  visionScore: number;
  visionWardsBoughtInGame: number;
  wardsKilled: number;
  wardsPlaced: number;
  win: boolean;
};

export type ItemPurchasedEvent = {
  itemId: number;
  participantId: number;
  timestamp: number;
  type: 'ITEM_PURCHASED';
};

export type LevelUpEvent = {
  level: number;
  participantId: number;
  timestamp: number;
  type: 'LEVEL_UP';
};

export type SkillLevelUpEvent = {
  levelUpType: string;
  participantId: number;
  skillSlot: number;
  timestamp: number;
  type: 'SKILL_LEVEL_UP';
};

export type WardPlacedEvent = {
  creatorId: number;
  timestamp: number;
  type: 'WARD_PLACED';
  wardType: 'YELLOW_TRINKET' | 'SIGHT_WARD' | 'CONTROL_WARD' | 'BLUE_TRINKET';
};

export type WardKillEvent = {
  killerId: number;
  timestamp: number;
  type: 'WARD_KILL';
  wardType: 'YELLOW_TRINKET' | 'SIGHT_WARD' | 'CONTROL_WARD' | 'BLUE_TRINKET';
};

export type ItemDestroyedEvent = {
  itemId: number;
  participantId: number;
  timestamp: number;
  type: 'ITEM_DESTROYED';
};

export type BuildingKillEvent = {
  assistingParticipantIds?: number[];
  buildingType: 'TOWER_BUILDING' | 'INHIBITOR_BUILDING';
  killerId: number;
  laneType: 'TOP_LANE' | 'MID_LANE' | 'BOT_LANE';
  position: Position;
  teamId: TeamId;
  timestamp: number;
  towerType?: 'OUTER_TURRET' | 'INNER_TURRET' | 'BASE_TURRET' | 'NEXUS_TURRET';
  type: 'BUILDING_KILL';
};

export type TurretPlateDestroyedEvent = {
  killerId: number;
  laneType: 'TOP_LANE' | 'MID_LANE' | 'BOT_LANE';
  position: Position;
  teamId: TeamId;
  timestamp: number;
  type: 'TURRET_PLATE_DESTROYED';
};

export type ChampionKillEvent = {
  assistingParticipantIds: number[];
  bounty: number;
  killStreakLength: number;
  killerId: number;
  position: Position;
  timestamp: number;
  type: 'CHAMPION_KILL';
  victimDamageDealt: {
    basic: boolean;
    magicDamage: number;
    name: string;
    participantId: number;
    physicalDamage: number;
    spellName: string;
    spellSlot: number;
    trueDamage: number;
    type: string;
  }[];
  victimDamageReceived: {
    basic: boolean;
    magicDamage: number;
    name: string;
    participantId: number;
    physicalDamage: number;
    spellName: string;
    spellSlot: number;
    trueDamage: number;
    type: string;
  }[];
  victimId: number;
};

export type PauseEndEvent = {
  realTimestamp: number;
  timestamp: number;
  type: 'PAUSE_END';
};

export type ChampionSpecialKillEvent = {
  killType: 'KILL_FIRST_BLOOD' | 'KILL_MULTI';
  killerId: number;
  multiKillLength?: number;
  position: Position;
  timestamp: number;
  type: 'CHAMPION_SPECIAL_KILL';
};

export type GameEndEvent = {
  gameId: number;
  realTimestamp: number;
  timestamp: number;
  type: 'GAME_END';
  winningTeam: number;
};

export type EliteMonsterKill = {
  assistingParticipantIds?: number[];
  killerId: number;
  killerTeamId: TeamId;
  monsterSubType?:
    | 'FIRE_DRAGON'
    | 'EARTH_DRAGON'
    | 'AIR_DRAGON'
    | 'WATER_DRAGON'
    | 'ELDER_DRAGON';
  monsterType: 'RIFTHERALD' | 'DRAGON' | 'BARON_NASHOR';
  position: Position;
  timestamp: number;
  type: 'ELITE_MONSTER_KILL';
};

export type MatchEvent =
  | PauseEndEvent
  | ItemPurchasedEvent
  | LevelUpEvent
  | SkillLevelUpEvent
  | WardPlacedEvent
  | WardKillEvent
  | ItemDestroyedEvent
  | BuildingKillEvent
  | TurretPlateDestroyedEvent
  | ChampionKillEvent
  | ChampionSpecialKillEvent
  | GameEndEvent
  | EliteMonsterKill;

export type MatchTimeline = {
  metadata: {
    dataVersion: string;
    matchId: string;
    participants: string[];
  };
  info: {
    frameInterval: number;
    frames: MatchTimelineFrame[];
    gameId: number;
    participants: {
      participantId: number;
      puuid: string;
    }[];
  };
};

export type MatchTimelineFrame = {
  events: MatchEvent[];
  participantFrames: {
    [id: string]: ParticipantFrame;
  };
  timestamp: number;
};

export type ParticipantFrame = {
  championStats: {
    abilityHaste: number;
    abilityPower: number;
    armor: number;
    armorPen: number;
    armorPenPercent: number;
    attackDamage: number;
    attackSpeed: number;
    bonusArmorPenPercent: number;
    bonusMagicPenPercent: number;
    ccReduction: number;
    cooldownReduction: number;
    health: number;
    healthMax: number;
    healthRegen: number;
    lifesteal: number;
    magicPen: number;
    magicPenPercent: number;
    magicResist: number;
    movementSpeed: number;
    omnivamp: number;
    physicalVamp: number;
    power: number;
    powerMax: number;
    powerRegen: number;
    spellVamp: number;
  };
  currentGold: number;
  damageStats: {
    magicDamageDone: number;
    magicDamageDoneToChampions: number;
    magicDamageTaken: number;
    physicalDamageDone: number;
    physicalDamageDoneToChampions: number;
    physicalDamageTaken: number;
    totalDamageDone: number;
    totalDamageDoneToChampions: number;
    totalDamageTaken: number;
    trueDamageDone: number;
    trueDamageDoneToChampions: number;
    trueDamageTaken: number;
  };
  goldPerSecond: number;
  jungleMinionsKilled: number;
  level: number;
  minionsKilled: number;
  participantId: number;
  position: Position;
  timeEnemySpentControlled: number;
  totalGold: number;
  xp: number;
};
