import { useState, useEffect, Dispatch, SetStateAction } from 'react';

const fakeStorage = {
  getItem: () => '',
  setItem: () => ''
};

function useStorage(
  key,
  storage = typeof sessionStorage !== 'undefined' ? sessionStorage : fakeStorage
): [string, Dispatch<SetStateAction<string>>] {
  const [data, setData] = useState(storage.getItem(key));

  useEffect(() => {
    setData(storage.getItem(key));
  }, [key]);

  return [data, setData];
}

export default useStorage;
