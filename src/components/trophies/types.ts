import { FC, SVGProps } from 'react';

export interface Trophy {
  name: string;
  title: string;
  description: string;
  level: string;
  island: string;
  ProgressIcon: FC<ProgressProps>;
}

export interface ProgressProps extends SVGProps<SVGSVGElement> {
  progress: number;
}
