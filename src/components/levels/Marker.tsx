import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';
import { FC } from 'react';
import { MarkerProps } from './types';
import { Tooltip } from '../tooltip';

const blink = keyframes`
  from, to {
    r: 0;
  }

  50% {
    r: 7;
  }
`;

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

const FocusCircle = styled.circle`
  fill: inherit;
  opacity: 0.2;
  stroke-width: 0;
`;

const BlinkCircle = styled(FocusCircle)`
  animation: ${blink} 2s ease infinite;
`;

const Path = styled.path`
  fill: inherit;
`;

const HalfCircle = props => {
  return <Path d="M4.4,7 a1,1 0 0,0 0,-6" {...props} />;
};

const Marker: FC<MarkerProps> = ({
  focused,
  status = 'locked',
  className,
  transform,
  ...groupElementProps
}) => {
  return (
    <>
      <foreignObject transform={transform} width="14" height="14">
        <Tooltip title="Hello" placement="bottom">
          <svg width="14" height="14" viewBox="0 0 14 14">
            <Group className={className} {...groupElementProps}>
              <PseudoCircle cx="7" cy="7" r="7" />
              {status === 'active' && !focused && (
                <BlinkCircle cx="7" cy="7" r="7" />
              )}
              {focused && <FocusCircle cx="7" cy="7" r="7" />}
              {status === 'unlocked' && <HalfCircle />}
              <Circle
                focused={focused}
                status={status}
                cx="7"
                cy="7"
                r="3.25"
              />
            </Group>
          </svg>
        </Tooltip>
      </foreignObject>
    </>
  );
};
export default Marker;
