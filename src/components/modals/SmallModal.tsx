import styled from '@emotion/styled';
import { FC, useEffect, useRef, useState } from 'react';

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 200;
`;

const Container = styled.div<{ left: number; top: number }>`
  background: #77777a;
  display: flex;
  flex-direction: column;
  position: fixed;
  left: ${(props) => props.left}px;
  top: ${(props) => props.top}px;
  padding: 15px;
  min-width: 300px;
`;

const Title = styled.h3`
  text-transform: uppercase;
`;

interface SmallModalProps {
  onClose(): void;
  title: string;
  targetId: string;
}

const SmallModal: FC<SmallModalProps> = ({
  children,
  onClose,
  title,
  targetId,
}) => {
  const containerNode = useRef<HTMLDivElement>();
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(-1000);

  useEffect(() => {
    const showTarget = (target) => {
      const { x, y, width, height } = target.getBoundingClientRect();
      const { offsetWidth: containerWidth } = containerNode.current;
      const left = x + width - containerWidth;
      const top = y + height;
      setLeft(left);
      setTop(top);
    };

    const element = document.querySelector(`[data-tooltip-id=${targetId}]`);
    if (element) {
      showTarget(element);
    }
  }, [targetId]);

  return (
    <Backdrop onClick={onClose}>
      <Container
        onClick={(event) => event.stopPropagation()}
        ref={containerNode}
        left={left}
        top={top}
      >
        <Title>{title}</Title>
        <div>{children}</div>
      </Container>
    </Backdrop>
  );
};

export default SmallModal;
