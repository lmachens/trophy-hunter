import HeaderButton from './HeaderButton';
import Minimize from '../icons/Minimize';
import overwolf from '../../api/overwolf';

const MinimizeButton = () => {
  return (
    <HeaderButton
      onClick={() =>
        overwolf.windows.getCurrentWindow((result) => {
          overwolf.windows.minimize(result.window.id);
        })
      }
    >
      <Minimize />
    </HeaderButton>
  );
};

export default MinimizeButton;
