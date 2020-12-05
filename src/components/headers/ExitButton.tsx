import styled from '@emotion/styled';
import HeaderButton from './HeaderButton';
import Close from '../icons/Close';
import {
  closeCurrentWindow,
  closeWindow,
  WindowName,
} from '../../api/overwolf';

const Button = styled(HeaderButton)`
  &:hover,
  &:active {
    background-color: #dd2a30;
  }
`;

type Props = {
  windowName?: WindowName;
};
const ExitButton = ({ windowName }: Props) => {
  return (
    <Button
      onClick={() =>
        windowName ? closeWindow(windowName) : closeCurrentWindow()
      }
    >
      <Close />
    </Button>
  );
};

export default ExitButton;
