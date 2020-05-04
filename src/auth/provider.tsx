import { createContext, useContext, useState, FC, Dispatch } from 'react';

const AuthContext = createContext<{
  user: any;
  setUser: Dispatch<any>;
}>({
  user: null,
  setUser: () => {
    return null;
  }
});

interface AuthProviderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialUser: any;
}

export const AuthProvider: FC<AuthProviderProps> = ({
  children,
  initialUser
}) => {
  const [user, setUser] = useState(initialUser);

  const value = {
    user,
    setUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  return useContext(AuthContext);
}
