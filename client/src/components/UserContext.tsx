import { createContext } from 'react';
import { UserContextValues } from '../lib/types';

const UserContext = createContext<UserContextValues>({
  user: undefined,
  token: undefined,
  handleSignIn: () => undefined,
});

export default UserContext;
