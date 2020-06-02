export const getLocalStorageItem = <T>(key: string, defaultValue: T) => {
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

export const setLocalStorageItem = (key: string, value: unknown) => {
  return localStorage.setItem(key, JSON.stringify(value));
};
