import styled from '@emotion/styled';
import { FC } from 'react';
import CloseIcon from '../icons/Close';

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  width: 500px;
  background: #3f3e43;
  position: relative;
`;

const Title = styled.h3`
  margin: 20px;
`;

const Body = styled.div`
  margin: 20px 30px 30px 30px;
`;

const Close = styled(CloseIcon)`
  position: absolute;
  right: 6px;
  top: 6px;
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

interface ModalProps {
  onClose(): void;
  title: string;
}

const Modal: FC<ModalProps> = ({ children, onClose, title }) => {
  return (
    <Backdrop onClick={onClose}>
      <Container onClick={event => event.stopPropagation()}>
        <Close onClick={onClose} />
        <Title>{title}</Title>
        <Body>{children}</Body>
      </Container>
    </Backdrop>
  );
};

export default Modal;
