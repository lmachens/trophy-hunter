import {
  FC,
  ReactNode,
  ReactElement,
  cloneElement,
  useRef,
  useState,
  useEffect,
  useCallback,
} from 'react';
import ReactDOM from 'react-dom';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

type Placement = 'right' | 'bottom' | 'bottomRight' | 'top' | 'topLeft';

interface ContainerProps {
  isVisible: boolean;
  left: number;
  top: number;
  placement: Placement;
  targetId: string;
  pointerEvents?: boolean;
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
  bottomRight: css`
    border-width: 6px 6px 6px 0px;
    transform: rotate(-90deg);
    top: calc(100% - 3px);
    left: calc(100% - 18px);
  `,
  top: css`
    border-width: 6px 6px 6px 0px;
    transform: rotate(90deg);
    top: -10px;
    left: calc(50% - 3px);
  `,
  topLeft: css`
    border-width: 6px 6px 6px 0px;
    transform: rotate(90deg);
    top: -10px;
    left: 18px;
  `,
};

const Container = styled.div<ContainerProps>`
  opacity: ${(props) => (props.isVisible ? '1' : '0')};
  position: fixed;
  background: #3f3e43;
  border: 1px solid #eaeaea;
  padding: 10px;
  min-width: 64px;
  left: ${(props) => Math.max(0, props.left)}px;
  top: ${(props) => Math.max(0, props.top)}px;
  pointer-events: ${(props) => (props.pointerEvents ? 'inherit' : 'none')};
  z-index: ${(props) => (props.targetId ? 90 : 100)};
  font-family: 'Roboto Mono', monospace;
  max-width: 320px;
  transition: opacity 0.15s;
  text-align: center;

  ::after {
    position: absolute;
    content: '';
    display: block;
    border: solid;
    border-color: transparent #eaeaea;
    ${(props) => arrows[props.placement]}
    margin-left: ${(props) =>
      props.placement !== 'right' ? Math.min(0, props.left) : 0}px;
  }
`;

const Title = styled.div`
  font-size: 1.14rem;
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
  pointerEvents?: boolean;
  onClick?(): void;
}

const Tooltip: FC<TooltipProps> = ({
  children,
  title,
  text,
  placement,
  offset = 10,
  targetId,
  className,
  visible,
  onClick,
  pointerEvents,
}) => {
  const containerNode = useRef<HTMLDivElement>();
  const bodyChildNode = useRef<HTMLDivElement>();

  const [isVisible, setIsVisible] = useState(false);
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);

  const showTarget = useCallback(
    (target) => {
      if (!containerNode.current) {
        const tooltip = document.createElement('div');
        document.body.appendChild(tooltip);
        bodyChildNode.current = tooltip;
        ReactDOM.render(
          <Container
            ref={containerNode}
            isVisible={visible || isVisible}
            left={left}
            top={top}
            placement={placement}
            className={className}
            targetId={targetId}
            pointerEvents={pointerEvents}
            onClick={onClick}
          >
            {title && <Title>{title}</Title>}
            {text && <div>{text}</div>}
          </Container>,
          bodyChildNode.current
        );
      }
      const { x, y, width, height } = target.getBoundingClientRect();

      const {
        offsetHeight: containerHeight,
        offsetWidth: containerWidth,
      } = containerNode.current;

      let newLeft;
      let newTop;
      switch (placement) {
        case 'right':
          newLeft = x + width + offset;
          newTop = y + height / 2 - containerHeight / 2;
          break;

        case 'bottom':
          newLeft = x + width / 2 - containerWidth / 2;
          newTop = y - offset - containerHeight;
          break;

        case 'bottomRight':
          newLeft = x + width / 2 - containerWidth + 16;
          newTop = y - offset - containerHeight;
          break;

        case 'top':
          newLeft = x + width / 2 - containerWidth / 2;
          newTop = y + height + offset;
          break;

        case 'topLeft':
          newLeft = x + width / 2 - 22;
          newTop = y + height + offset;
          break;
      }

      setLeft(newLeft);
      setTop(newTop);
      setIsVisible(true);
    },
    [containerNode.current]
  );

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
      }, 400);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [targetId]);

  useEffect(() => {
    return () => {
      if (bodyChildNode.current) {
        document.body.removeChild(bodyChildNode.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!bodyChildNode.current) {
      return;
    }
    ReactDOM.render(
      <Container
        ref={containerNode}
        isVisible={visible || isVisible}
        left={left}
        top={top}
        placement={placement}
        className={className}
        targetId={targetId}
        pointerEvents={pointerEvents}
        onClick={onClick}
      >
        {title && <Title>{title}</Title>}
        {text && <div>{text}</div>}
      </Container>,
      bodyChildNode.current
    );
  }, [left, top, visible, isVisible, placement, className, title, text]);

  return (
    <>
      {children &&
        cloneElement(children, {
          onMouseEnter: handleMouseEnter,
          onMouseLeave: handleMouseLeave,
        })}
    </>
  );
};

export default Tooltip;
