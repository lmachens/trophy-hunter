import { parseJSON } from './json';

export const getLocalStorageItem = <T>(key: string, defaultValue: T) => {
  if (typeof window === 'undefined') {
    return defaultValue;
  }
  const item = localStorage.getItem(key);
  if (item === null || item === undefined) {
    return defaultValue;
  }
  return parseJSON(item, defaultValue);
};

export const setLocalStorageItem = (key: string, value: unknown) => {
  if (typeof window === 'undefined') {
    return;
  }
  localStorage.setItem(key, JSON.stringify(value));
};

export const unsetLocalStorageItem = (key: string) => {
  if (typeof window === 'undefined') {
    return;
  }
  localStorage.removeItem(key);
};
