import HeaderButton from './HeaderButton';
import overwolf from '../../api/overwolf';
import Maximize from '../icons/Maximize';
import Restore from '../icons/Restore';
import { useEffect, useState } from 'react';

const SizeButton = () => {
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    overwolf.windows.getCurrentWindow((result) => {
      setIsMaximized(result.window.stateEx === 'maximized');
    });
  }, []);

  return (
    <HeaderButton
      onClick={() =>
        overwolf.windows.getCurrentWindow((result) => {
          if (result.window.stateEx === 'maximized') {
            overwolf.windows.restore(result.window.id);
            setIsMaximized(false);
          } else {
            overwolf.windows.maximize(result.window.id);
            setIsMaximized(true);
          }
        })
      }
    >
      {isMaximized ? <Restore /> : <Maximize />}
    </HeaderButton>
  );
};

export default SizeButton;
