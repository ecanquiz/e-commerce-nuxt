import type { User } from '../user';

export interface AuthUser extends Omit<User, 'password'> {};

export interface AuthContext {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Omit<User, 'id' | 'createdAt'>) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export * from './profile';
