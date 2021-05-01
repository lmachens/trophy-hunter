import React from 'react';

type PercantageProps = {
  max: number;
  value: number;
};
function Percantage({ max, value }: PercantageProps) {
  return <span>{Math.floor((value / max) * 100)}%</span>;
}

export default Percantage;
