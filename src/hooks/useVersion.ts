import { useEffect, useState } from 'react';
import { getVersion } from '../api/overwolf';

const useVersion = () => {
  const [version, setVersion] = useState('Unknown');

  useEffect(() => {
    getVersion().then((version) => setVersion(version));
  }, []);

  return version;
};

export default useVersion;
