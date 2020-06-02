import { useState } from 'react';

const useHotkey = () => {
  const [hotkey] = useState('Ctrl+H');

  return hotkey;
};

export default useHotkey;
