import {
  FC,
  ReactNode,
  ReactElement,
  cloneElement,
  useRef,
  useState
} from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

type Placement = 'right';

interface ContainerProps {
  isVisible: boolean;
  left: number;
  top: number;
  placement: Placement;
}

const arrows = {
  right: css`
    border-width: 6px 6px 6px 0em;
    top: calc(50% - 6px);
    left: -6px;
  `
};

const Container = styled.div<ContainerProps>`
  opacity: ${props => (props.isVisible ? '1' : '0')};
  position: absolute;
  background: #3f3e43;
  border: 1px solid #eaeaea;
  padding: 10px;
  left: ${props => props.left}px;
  top: ${props => props.top}px;
  pointer-events: none;
  z-index: 10;
  font-family: 'Roboto Mono', monospace;

  ::after {
    position: absolute;
    content: '';
    display: block;
    border: solid;
    border-color: transparent #eaeaea;
    ${props => arrows[props.placement]}
  }
`;

interface TooltipProps {
  title: ReactNode;
  placement: Placement;
  children: ReactElement;
  offset?: number;
}

const Tooltip: FC<TooltipProps> = ({
  children,
  title,
  placement,
  offset = 10
}) => {
  const containerNode = useRef<HTMLDivElement>();
  const [isVisible, setIsVisible] = useState(false);
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);

  function handleMouseEnter(event) {
    const { offsetLeft, offsetWidth, offsetTop, offsetHeight } = event.target;
    const {
      offsetHeight: containerHeight,
      offsetWidth: containerWidth
    } = containerNode.current;

    let left;
    let top;
    if (placement === 'right') {
      left = offsetLeft + offsetWidth + offset;
      top = offsetTop + offsetHeight / 2 - containerHeight / 2;
    }

    setLeft(left);
    setTop(top);
    setIsVisible(true);
  }

  function handleMouseLeave() {
    setIsVisible(false);
  }

  return (
    <>
      {cloneElement(children, {
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave
      })}
      <Container
        ref={containerNode}
        isVisible={isVisible}
        left={left}
        top={top}
        placement={placement}
      >
        {title}
      </Container>
    </>
  );
};

export default Tooltip;
