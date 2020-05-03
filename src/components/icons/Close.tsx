import { FC, SVGProps } from 'react';

const Close: FC<SVGProps<SVGSVGElement>> = props => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" {...props}>
      <line
        x1="19.5"
        y1="10.5"
        x2="10.5"
        y2="19.5"
        fill="none"
        stroke="currentcolor"
        strokeLinecap="round"
      />
      <line
        x1="10.5"
        y1="10.5"
        x2="19.5"
        y2="19.5"
        fill="none"
        stroke="currentcolor"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Close;
