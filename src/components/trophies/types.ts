import { FC, SVGProps } from 'react';
import { Match } from '../../api/riot/types';
import { Account } from '../../api/accounts';

export interface Trophy {
  name: string;
  title: string;
  description: string;
  level: string;
  island: string;
  ProgressIcon: FC<ProgressProps>;
  checkProgress(match: Match, account: Account): number;
}

export interface ProgressProps extends SVGProps<SVGSVGElement> {
  progress: number;
}
