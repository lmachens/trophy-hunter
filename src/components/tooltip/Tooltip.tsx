import {
  FC,
  ReactNode,
  ReactElement,
  cloneElement,
  useRef,
  useState,
  useEffect
} from 'react';
import ReactDOM from 'react-dom';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

type Placement = 'right' | 'bottom' | 'top';

interface ContainerProps {
  isVisible: boolean;
  left: number;
  top: number;
  placement: Placement;
  targetId: string;
}

const arrows = {
  right: css`
    border-width: 6px 6px 6px 0px;
    top: calc(50% - 6px);
    left: -6px;
  `,
  bottom: css`
    border-width: 6px 6px 6px 0px;
    transform: rotate(-90deg);
    top: calc(100% - 3px);
    left: calc(50% - 3px);
  `,
  top: css`
    border-width: 6px 6px 6px 0px;
    transform: rotate(90deg);
    top: -10px;
    left: 18px;
  `
};

const Container = styled.div<ContainerProps>`
  opacity: ${props => (props.isVisible ? '1' : '0')};
  position: fixed;
  background: #3f3e43;
  border: 1px solid #eaeaea;
  padding: 10px;
  min-width: 100px;
  left: ${props => props.left}px;
  top: ${props => props.top}px;
  pointer-events: none;
  z-index: ${props => (props.targetId ? 9 : 10)};
  font-family: 'Roboto Mono', monospace;
  max-width: 300px;
  transition: opacity 0.15s;

  ::after {
    position: absolute;
    content: '';
    display: block;
    border: solid;
    border-color: transparent #eaeaea;
    ${props => arrows[props.placement]}
  }
`;

const Text = styled.div`
  font-family: 'Lato', sans-serif;
  font-size: 14px;
`;

interface TooltipProps {
  title?: ReactNode;
  text?: ReactNode;
  placement: Placement;
  children?: ReactElement;
  offset?: number;
  targetId?: string;
  className?: string;
  visible?: boolean;
}

const Tooltip: FC<TooltipProps> = ({
  children,
  title,
  text,
  placement,
  offset = 10,
  targetId,
  className,
  visible
}) => {
  const containerNode = useRef<HTMLDivElement>();
  const bodyChildNode = useRef<HTMLDivElement>();

  const [isVisible, setIsVisible] = useState(false);
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);

  function showTarget(target) {
    const { x, y, width, height } = target.getBoundingClientRect();

    const {
      offsetHeight: containerHeight,
      offsetWidth: containerWidth
    } = containerNode.current;

    let left;
    let top;
    switch (placement) {
      case 'right':
        left = x + width + offset;
        top = y + height / 2 - containerHeight / 2;
        break;

      case 'bottom':
        left = x + width / 2 - containerWidth / 2;
        top = y - offset - containerHeight;
        break;

      case 'top':
        left = x + width / 2 - containerWidth / 2;
        top = y + height + offset;
        break;
    }

    setLeft(left);
    setTop(top);
    setIsVisible(true);
  }

  function handleMouseEnter(event) {
    showTarget(event.target);
  }

  function handleMouseLeave() {
    setIsVisible(false);
  }

  useEffect(() => {
    if (targetId) {
      const timeoutId = setTimeout(() => {
        const element = document.querySelector(`[data-tooltip-id=${targetId}]`);
        if (element) {
          showTarget(element);
        }
      }, 200);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [targetId]);

  useEffect(() => {
    const tooltip = document.createElement('div');
    document.body.appendChild(tooltip);
    bodyChildNode.current = tooltip;

    return () => {
      document.body.removeChild(tooltip);
    };
  }, []);

  useEffect(() => {
    ReactDOM.render(
      <Container
        ref={containerNode}
        isVisible={visible || isVisible}
        left={left}
        top={top}
        placement={placement}
        className={className}
        targetId={targetId}
      >
        {title && <h3>{title}</h3>}
        {text && <Text>{text}</Text>}
      </Container>,
      bodyChildNode.current
    );
  }, [left, top, visible, isVisible, placement, className, title, text]);

  return (
    <>
      {children &&
        cloneElement(children, {
          onMouseEnter: handleMouseEnter,
          onMouseLeave: handleMouseLeave
        })}
    </>
  );
};

export default Tooltip;
