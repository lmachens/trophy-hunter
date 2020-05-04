import { createContext, useContext, useState, FC, useEffect } from 'react';

const OverwolfWindowContext = createContext(null);

export const OverwolfWindowProvider: FC = ({ children }) => {
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    // Fake maximize
    setTimeout(() => setIsMaximized(!isMaximized), 5000);
  }, []);

  const value = {
    isMaximized
  };

  return (
    <OverwolfWindowContext.Provider value={value}>
      {children}
    </OverwolfWindowContext.Provider>
  );
};

export function useOverwolfWindow() {
  return useContext(OverwolfWindowContext);
}
