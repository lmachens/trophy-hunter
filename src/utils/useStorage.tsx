import { useState, useEffect, Dispatch, SetStateAction } from 'react';

const fakeStorage = {
  getItem: () => '',
  setItem: () => '',
  removeItem: () => ''
};

function useStorage(
  key,
  storage = typeof sessionStorage !== 'undefined' ? sessionStorage : fakeStorage
): [string, Dispatch<SetStateAction<string>>] {
  const [data, setData] = useState(storage.getItem(key));

  useEffect(() => {
    setData(storage.getItem(key));
  }, [key]);

  function updateData(data) {
    if (!data) {
      storage.removeItem(key);
    } else {
      storage.setItem(key, data);
    }
    setData(data);
  }

  return [data, updateData];
}

export default useStorage;
