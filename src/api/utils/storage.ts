import { parseJSON } from './json';

export const getLocalStorageItem = <T>(key: string, defaultValue: T) => {
  const item = localStorage.getItem(key);
  if (item === null || item === undefined) {
    return defaultValue;
  }
  return parseJSON(item, defaultValue);
};

export const setLocalStorageItem = (key: string, value: unknown) => {
  return localStorage.setItem(key, JSON.stringify(value));
};
