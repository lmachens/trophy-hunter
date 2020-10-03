import styled from '@emotion/styled';
import useHotkey from '../../hooks/useHotkey';
import { FC } from 'react';
import Status from '../common/Status';
import Grow from '../common/Grow';
import Header from './Header';

const Hotkey = styled.span`
  margin-right: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const Hint = styled.span`
  color: #77777a;
  margin-right: 4px;
`;

const InGameHeader: FC = () => {
  const hotkey = useHotkey('show_trophy_hunter');

  return (
    <Header>
      <Status />
      <Grow />
      <Hotkey>
        <Hint>Show/Hide</Hint>
        {hotkey}
      </Hotkey>
    </Header>
  );
};

export default InGameHeader;
