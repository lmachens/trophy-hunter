import {
  useState,
  useCallback,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';
import {
  getLocalStorageItem,
  setLocalStorageItem,
  unsetLocalStorageItem,
} from '../api/utils/storage';

const usePersistentState = <T>(
  key: string,
  defaultValue: T
): [T, Dispatch<SetStateAction<T>>, () => void] => {
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

  const unsetPersistentValue = useCallback(() => {
    unsetLocalStorageItem(key);
    setValue(undefined);
  }, [key]);

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

  return [value, setPersistentValue, unsetPersistentValue];
};

export default usePersistentState;
