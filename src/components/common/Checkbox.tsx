import styled from '@emotion/styled';
import { FC, InputHTMLAttributes, ReactNode } from 'react';
import CheckMark from '../icons/CheckMark';

const Label = styled.label`
  height: 36px;
  display: flex;
  align-items: center;
  font-family: 'Roboto Mono', monospace;
  font-size: 0.9rem;
  cursor: pointer;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
`;

const Box = styled.div`
  height: 10px;
  width: 10px;
  border: 1px solid #77777a;
  position: relative;
  margin-right: 7px;

  svg {
    position: absolute;
    left: 1px;
    bottom: 1px;
  }
`;

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: ReactNode;
}

const Checkbox: FC<CheckboxProps> = ({ label, checked, ...inputProps }) => {
  return (
    <Label>
      <input checked={checked} {...inputProps} type="checkbox" />
      <Box>{checked && <CheckMark />}</Box>
      {label}
    </Label>
  );
};

export default Checkbox;
