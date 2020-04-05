import { FC, SVGProps } from 'react';

export interface MarkerProps extends SVGProps<SVGGElement> {
  status: 'active' | 'unlocked' | 'locked' | 'completed';
}

export interface Level {
  island: string;
  name: string;
  title: string;
  Icon: React.FC;
  Marker: FC<MarkerProps>;
  trophies: /* Trophy */ [];
}
