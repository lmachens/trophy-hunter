import styled from '@emotion/styled';
import { FC } from 'react';
import CloseIcon from '../icons/Close';
import Backdrop from '../common/Backdrop';

const Container = styled.div`
  width: 500px;
  height: 451px;
  background: #3f3e43;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  margin: 20px;
  text-transform: uppercase;
  text-align: center;
`;

const Body = styled.div`
  padding: 10px 20px 20px 20px;
  margin: 10px;
  overflow: auto;
  height: 100%;
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
      <Container onClick={(event) => event.stopPropagation()}>
        <Close onClick={onClose} />
        <Title>{title}</Title>
        <Body>{children}</Body>
      </Container>
    </Backdrop>
  );
};

export default Modal;
