import { useState, useEffect } from 'react';
import { getHotkey } from '../api/overwolf';

const useHotkey = () => {
  const [hotkey, setHotkey] = useState('');

  useEffect(() => {
    getHotkey('show_trophy_hunter')
      .then(setHotkey)
      .catch(() => setHotkey('unknown'));

    const handleChange = (event: overwolf.settings.hotkeys.OnChangedEvent) => {
      if (event.name === 'show_trophy_hunter') {
        setHotkey(event.binding);
      }
    };
    overwolf.settings.hotkeys.onChanged.addListener(handleChange);

    return () => {
      overwolf.settings.hotkeys.onChanged.removeListener(handleChange);
    };
  }, []);

  return hotkey;
};

export default useHotkey;
