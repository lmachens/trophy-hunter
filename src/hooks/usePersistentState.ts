import { useState, Dispatch, SetStateAction, useEffect } from 'react';
import {
  getLocalStorageItem,
  setLocalStorageItem,
  unsetLocalStorageItem,
} from '../api/utils/storage';

const usePersistentState = <T>(
  key: string,
  defaultValue: T
): [T, Dispatch<SetStateAction<T>>, () => void] => {
  const [value, setValue] = useState<T>(() =>
    getLocalStorageItem<T>(key, defaultValue)
  );

  const unsetPersistentValue = () => {
    setValue(undefined);
  };

  useEffect(() => {
    if (value === undefined) {
      unsetLocalStorageItem(key);
    } else {
      setLocalStorageItem(key, value);
    }
  }, [key, value]);

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== key) {
        return;
      }
      if (!event.newValue) {
        setValue(undefined);
      } else {
        setValue(getLocalStorageItem<T>(key, defaultValue));
      }
    };
    window.addEventListener('storage', handleStorage, false);

    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, [key]);

  return [value, setValue, unsetPersistentValue];
};

export default usePersistentState;
