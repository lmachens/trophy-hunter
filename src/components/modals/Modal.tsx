import styled from '@emotion/styled';
import { FC } from 'react';
import CloseIcon from '../icons/Close';
import Backdrop from '../common/Backdrop';
import Checkbox from '../common/Checkbox';
import FancyButton from '../common/FancyButton';

const Container = styled.div`
  width: 600px;
  height: 451px;
  background: #3f3e43;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  margin: 20px;
  text-transform: uppercase;
  text-align: left;
`;

export const ModalBody = styled.div`
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

const DontShowAgain = styled.aside`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #1f1f1f;
  color: #717174;

  small {
    margin: 0px 24px 10px 24px;
    display: block;
  }
`;

interface ModalProps {
  onClose?(): void;
  title?: string;
  onShowAgainChange?(showAgain: boolean): void;
  showAgain?: boolean;
  className?: string;
}

const Modal: FC<ModalProps> = ({
  children,
  onClose,
  title,
  onShowAgainChange,
  showAgain,
  className,
}) => {
  return (
    <Backdrop>
      <Container
        onClick={(event) => event.stopPropagation()}
        className={className}
      >
        {onClose && <Close onClick={onClose} />}
        {title && <Title>{title}</Title>}
        <ModalBody>{children}</ModalBody>
        {onShowAgainChange && (
          <DontShowAgain>
            <div>
              <Checkbox
                label="Don't show this again"
                checked={!showAgain}
                onChange={(event) => onShowAgainChange(!event.target.checked)}
              />
              <small>*You can always change this in settings</small>
            </div>
            <FancyButton onClick={onClose}>Continue</FancyButton>
          </DontShowAgain>
        )}
      </Container>
    </Backdrop>
  );
};

export default Modal;
