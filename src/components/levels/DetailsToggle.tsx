import { FC, HTMLAttributes } from 'react';
import styled from '@emotion/styled';
import ArrowLeft from '../icons/ArrowLeft';
import ArrowRight from '../icons/ArrowRight';

const ToggleContainer = styled.div`
  position: absolute;
  left: -30px;
  top: calc(50% - 20px);
  height: 40px;
  width: 30px;
  border: 1px solid #eaeaea;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #2b2a30;
  cursor: pointer;
`;

interface DetailsToggleProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
}

const DetailsToggle: FC<DetailsToggleProps> = ({ open, onClick }) => {
  return (
    <ToggleContainer onClick={onClick}>
      {open ? <ArrowRight /> : <ArrowLeft />}
    </ToggleContainer>
  );
};

export default DetailsToggle;
