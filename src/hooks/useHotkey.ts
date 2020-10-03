import { useState, useEffect } from 'react';
import { getHotkey } from '../api/overwolf';

const useHotkey = (name: string): string => {
  const [hotkey, setHotkey] = useState('');

  useEffect(() => {
    getHotkey(name)
      .then(setHotkey)
      .catch(() => setHotkey('unknown'));

    const handleChange = (event: overwolf.settings.hotkeys.OnChangedEvent) => {
      if (event.name === name) {
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
