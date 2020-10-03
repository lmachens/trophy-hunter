import styled from '@emotion/styled';
import { ButtonHTMLAttributes, FC } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected: boolean;
}

const Button = styled.button`
  width: 90px;
  height: 90px;
  position: relative;
  cursor: pointer;
  border: none;
  padding: 0;
  background: none;
  outline: none;

  :disabled {
    opacity: 0.3;
    cursor: default;
  }

  span {
    position: absolute;
    bottom: 5px;
    left: 0;
    width: 100%;
    text-align: center;
  }
`;

export interface FilterProps extends ButtonProps {
  title: string;
}

const Filter: FC<FilterProps> = ({ children, title, ...props }) => {
  return (
    <Button {...props}>
      {children}
      <span>{title}</span>
    </Button>
  );
};

export default Filter;
