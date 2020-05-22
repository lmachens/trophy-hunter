import styled from '@emotion/styled';
import { FC } from 'react';
import CloseIcon from '../icons/Close';
import Backdrop from '../common/Backdrop';

const Container = styled.div`
  width: 500px;
  background: #3f3e43;
  position: relative;
`;

const Title = styled.h3`
  margin: 20px;
  text-transform: uppercase;
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
      <Container onClick={(event) => event.stopPropagation()}>
        <Close onClick={onClose} />
        <Title>{title}</Title>
        <Body>{children}</Body>
      </Container>
    </Backdrop>
  );
};

export default Modal;
