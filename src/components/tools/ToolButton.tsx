import { FC, ReactNode, useState, MouseEvent } from 'react';
import styled from '@emotion/styled';
import ArrowLeft from '../icons/ArrowLeft';
import ArrowRight from '../icons/ArrowRight';

interface ButtonProps {
  active?: boolean;
}

const Button = styled.button<ButtonProps>`
  position: relative;
  width: 100%;
  background: ${props => (props.active ? '#2B2A30' : '#222')};
  border: none;
  cursor: pointer;
  transition: 0.15s;

  :focus {
    outline: none;
  }

  &:hover,
  &:active {
    background-color: #818c99;
  }

  border-top: 1px solid #3f3e43;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
`;

const BottomPartialLeft = styled.div`
  display: flex;
  justify-content: center;
  flex-grow: 1;
`;

const BottomPartialRight = styled.div`
  border-left: 1px solid #3f3e43;
  height: 50px;
  padding: 6px;
  display: flex;
  align-items: center;
`;

interface ToolButtonProps {
  active: boolean;
  icon: ReactNode;
  onClick(event: MouseEvent): void;
}

const ToolButton: FC<ToolButtonProps> = ({ icon, active, onClick }) => {
  return (
    <Button active={active} onClick={onClick}>
      <BottomPartialLeft>{icon}</BottomPartialLeft>
      <BottomPartialRight>
        {active ? <ArrowLeft /> : <ArrowRight />}
      </BottomPartialRight>
    </Button>
  );
};

export default ToolButton;
