import { FC } from 'react';
import Status from '../common/Status';
import Grow from '../common/Grow';
import Header from './Header';
import ExitButton from './ExitButton';

const LoadingScreenHeader: FC = () => {
  return (
    <Header>
      <Status />
      <Grow />
      <ExitButton />
    </Header>
  );
};

export default LoadingScreenHeader;
