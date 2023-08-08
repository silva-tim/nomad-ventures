import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Auth, User } from '../lib/types';

export type UserContextValues = {
  user: User | undefined;
  token: string | undefined;
  onSignIn: (auth: Auth) => void;
};

const UserContext = createContext<UserContextValues>({
  user: undefined,
  token: undefined,
  onSignIn: () => undefined,
});

type props = {
  children: ReactNode;
};

export default function UserContextProvider({ children }: props) {
  const [user, setUser] = useState<User>();
  const [token, setToken] = useState<string>();

  useEffect(() => {
    async function getToken() {
      const auth = localStorage.getItem('tokenKey');
      if (auth) {
        const a = JSON.parse(auth);
        setUser(a.user);
        setToken(a.token);
      }
    }
    getToken();
  }, []);

  function onSignIn(auth: Auth) {
    sessionStorage.setItem('tokenKey', JSON.stringify(auth));
    setUser(auth.user);
    setToken(auth.token);
  }

  return (
    <UserContext.Provider value={{ user, token, onSignIn }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser can only be used inside UserContextProvider');
  }

  return context;
}
