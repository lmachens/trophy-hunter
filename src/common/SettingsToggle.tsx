import React from 'react';
import styled from '@emotion/styled';
import { FC } from 'react';

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 30px;
  height: 16px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #353438;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border: 1px solid #77777a;
  }

  span:before {
    position: absolute;
    content: '';
    height: 10px;
    width: 10px;
    left: 2px;
    bottom: 2px;
    background-color: #3f3e43;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:checked + span {
  }

  input:hover + span {
    background-color: #77777a;
  }

  input:checked + span:before {
    transform: translateX(14px);
    background-color: #eaeaea;
  }
`;

const SettingsToggle: FC<React.InputHTMLAttributes<
  HTMLInputElement
>> = props => {
  return (
    <Switch>
      <input type="checkbox" {...props} />
      <span />
    </Switch>
  );
};

export default SettingsToggle;
