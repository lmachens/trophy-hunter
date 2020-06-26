import {
  useState,
  useCallback,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';
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

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== key || !event.newValue) {
        return;
      }
      setValue(getLocalStorageItem<T>(key, defaultValue));
    };
    window.addEventListener('storage', handleStorage, false);

    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, [key]);

  return [value, setPersistentValue];
};

export default usePersistentState;
