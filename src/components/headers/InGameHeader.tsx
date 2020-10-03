import useHotkey from '../../hooks/useHotkey';
import { FC } from 'react';
import Status from '../common/Status';
import Grow from '../common/Grow';
import Header from './Header';
import Hotkey from './HotKey';

const InGameHeader: FC = () => {
  const hotkey = useHotkey('show_trophy_hunter');

  return (
    <Header>
      <Status />
      <Grow />
      <Hotkey hint="Show/Hide" value={hotkey} />
    </Header>
  );
};

export default InGameHeader;
