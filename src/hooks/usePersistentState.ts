import { useState, useCallback, Dispatch, SetStateAction } from 'react';
import { getLocalStorageItem, setLocalStorageItem } from '../api/utils/storage';

const usePersistentState = <T>(
  key: string,
  defaultValue: T
): [T, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(
    getLocalStorageItem<T>(key, defaultValue)
  );

  const setPersistentValue = useCallback(
    (value: T) => {
      setLocalStorageItem(key, value);
      setValue(value);
    },
    [key]
  );

  return [value, setPersistentValue];
};

export default usePersistentState;
