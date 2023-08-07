import { createContext } from 'react';
import { User } from '../lib/types';

const UserContext = createContext<User>({
  username: undefined,
  token: undefined,
  userId: undefined,
});
export default UserContext;
