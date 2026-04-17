import { User, SignInCredentials } from '../../types/auth';

export interface IAuthService {
  signIn(credentials: SignInCredentials): Promise<User>;
  signOut(): Promise<void>;
  sendPasswordReset(email: string): Promise<void>;
  onAuthStateChanged(callback: (user: User | null) => void): () => void;
  getCurrentUser(): User | null;
}
