import { useEffect, useState } from 'react';
import { getDisplays } from '../api/overwolf';

const useDisplays = () => {
  const [displays, setDisplays] = useState([]);

  useEffect(() => {
    getDisplays().then(setDisplays);
  }, []);

  return displays;
};

export default useDisplays;
