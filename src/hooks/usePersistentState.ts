import { useState, useCallback, Dispatch, SetStateAction } from 'react';

const getLocalStorageItem = <T>(key: string, defaultValue: T) => {
  try {
    const item = localStorage.getItem(key);
    if (item === null || item === undefined) {
      return defaultValue;
    }
    return JSON.parse(item);
  } catch (error) {
    return defaultValue;
  }
};

const usePersistentState = <T>(
  key: string,
  defaultValue: T
): [T, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(
    getLocalStorageItem<T>(key, defaultValue)
  );

  const setPersistentValue = useCallback(
    (value: T) => {
      const valueJSON = JSON.stringify(value);
      localStorage.setItem(key, valueJSON);
      setValue(value);
    },
    [key]
  );

  return [value, setPersistentValue];
};

export default usePersistentState;
