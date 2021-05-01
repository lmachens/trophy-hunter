import React from 'react';

type PercentageProps = {
  max: number;
  value: number;
};
function Percentage({ max, value, ...rest }: PercentageProps) {
  return <span {...rest}>{((value / max) * 100).toFixed(2)}%</span>;
}

export default Percentage;
