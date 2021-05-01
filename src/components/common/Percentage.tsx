import React from 'react';

type PercentageProps = {
  max: number;
  value: number;
};
function Percentage({ max, value, ...rest }: PercentageProps) {
  return <span {...rest}>{Math.floor((value / max) * 100)}%</span>;
}

export default Percentage;
