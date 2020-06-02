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
  checkProgress(props: {
    match: Match;
    timeline: MatchTimeline;
    account: Account;
  }): number;
  checkLive?(liveClientData: {
    activeGame: any;
    activePlayer: any;
    allPlayers: any;
    events: any;
    gameData: any;
    account: Account;
  }): number;
}

export interface ProgressProps extends SVGProps<SVGSVGElement> {
  progress: number;
}
