import React, { createContext, useState, useEffect } from 'react';

import { User } from '../interfaces/user';
import restApi from '../network/restApi';

interface Props {
  children: JSX.Element | JSX.Element[];
}

export interface AuthContextInterface {
  isFetchingUser: boolean;
  user: User | null;
  setIsFetchingUser: (isFetchingUser: boolean) => void;
  setUser: (user: User) => void;
  login: (email: string, password: string) => void;
}

export const AuthContext = createContext<AuthContextInterface | undefined>(undefined);

export function AuthContextProvider({ children }: Props) {
  const [isFetchingUser, setIsFetchingUser] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    checkLoggedInUser();
  }, []);

  async function checkLoggedInUser() {
    try {
      const res = await restApi.fetchLoggedInUser();
      setUser(res.data);
    } catch (err) {
      console.error(err);
    }
    setIsFetchingUser(false);
  }

  async function login(email: string, password: string) {
    const res = await restApi.authenticate(email, password);
    setUser(res.data);
  }

  const contextValue: AuthContextInterface = {
    isFetchingUser,
    user,
    setIsFetchingUser,
    setUser,
    login,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('AuthContext must be used within AuthContextProvider');
  }
  return context;
}
