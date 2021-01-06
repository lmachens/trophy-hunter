import { useEffect, useState } from 'react';
import { getAppVersion } from '../api/overwolf';
import { getRecentVersion } from '../api/riot';

const useVersion = () => {
  const [appVersion, setAppVersion] = useState('Unknown');
  const [riotVersion, setRiotVersion] = useState(null);
  const [season, setSeason] = useState(null);

  useEffect(() => {
    getAppVersion().then((version) => setAppVersion(version));
    getRecentVersion().then((version) => {
      setRiotVersion(version.riot);
      setSeason(version.season);
    });
  }, []);

  return { appVersion, riotVersion, season };
};

export default useVersion;
