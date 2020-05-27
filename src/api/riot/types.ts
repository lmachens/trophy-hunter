export interface Summoner {
  platformId: string;
  accountId: string;
  profileIconId: number;
  revisionDate: number;
  name: string;
  id: string;
  puuid: string;
  summonerLevel: number;
}

export interface Match {
  gameId: number;
  queueId: number;
}
