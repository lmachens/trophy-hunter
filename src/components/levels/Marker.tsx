import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';
import { FC, SVGProps } from 'react';

const blink = keyframes`
  from, to {
    r: 0;
  }

  50% {
    r: 7;
  }
`;

interface MarkerProps extends SVGProps<SVGGElement> {
  status: 'active' | 'unlocked' | 'locked' | 'completed';
}

const Circle = styled.circle<MarkerProps>`
  opacity: ${props => (props.status === 'locked' ? 0.4 : 1)};
  stroke: inherit;
  stroke-width: 1.5px;
  fill: ${props => (props.status === 'completed' ? 'inherit' : 'none')};
`;

const Group = styled.g`
  cursor: pointer;
  stroke: currentColor;
  fill: currentColor;
`;

const PseudoCircle = styled.circle`
  opacity: 0;
`;

const BlinkCircle = styled.circle`
  animation: ${blink} 2s ease infinite;
  fill: inherit;
  opacity: 0.2;
  stroke-width: 0;
`;

const Path = styled.path`
  fill: inherit;
`;

const HalfCircle = props => {
  return <Path d="M4.4,7 a1,1 0 0,0 0,-6" {...props} />;
};

const Marker: FC<MarkerProps> = ({
  status,
  className,
  ...groupElementProps
}) => {
  return (
    <Group className={className} {...groupElementProps}>
      <PseudoCircle cx="4" cy="4" r="7" />
      {status === 'active' && <BlinkCircle cx="4" cy="4" r="7" />}
      {status === 'unlocked' && <HalfCircle />}
      <Circle status={status} cx="4" cy="4" r="3.25" />
    </Group>
  );
};
export default Marker;
