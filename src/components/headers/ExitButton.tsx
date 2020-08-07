import styled from '@emotion/styled';
import HeaderButton from './HeaderButton';
import Close from '../icons/Close';

const Button = styled(HeaderButton)`
  &:hover,
  &:active {
    background-color: #dd2a30;
  }
`;

const ExitButton = () => {
  return (
    <Button onClick={() => overwolf.windows.getMainWindow().close()}>
      <Close />
    </Button>
  );
};

export default ExitButton;
