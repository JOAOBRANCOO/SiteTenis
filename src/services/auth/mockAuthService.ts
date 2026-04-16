import { IAuthService } from './IAuthService';
import { User, SignInCredentials } from '../../types/auth';

const MOCK_USERS: Array<{ email: string; password: string; user: User }> = [
  {
    email: 'demo@historicalreleases.com',
    password: 'demo123',
    user: {
      uid: 'mock-uid-1',
      email: 'demo@historicalreleases.com',
      displayName: 'Usuário Demo',
    },
  },
];

const SESSION_KEY = 'mock_auth_user';

export class MockAuthService implements IAuthService {
  private listeners: Array<(user: User | null) => void> = [];
  private currentUser: User | null = null;

  constructor() {
    const stored = localStorage.getItem(SESSION_KEY);
    if (stored) {
      try {
        this.currentUser = JSON.parse(stored) as User;
      } catch {
        this.currentUser = null;
      }
    }
  }

  async signIn(credentials: SignInCredentials): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 800));
    const found = MOCK_USERS.find(
      u => u.email === credentials.email && u.password === credentials.password
    );
    if (!found) {
      throw new Error('E-mail ou senha inválidos.');
    }
    this.currentUser = found.user;
    localStorage.setItem(SESSION_KEY, JSON.stringify(found.user));
    this.notifyListeners(found.user);
    return found.user;
  }

  async signOut(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));
    this.currentUser = null;
    localStorage.removeItem(SESSION_KEY);
    this.notifyListeners(null);
  }

  async sendPasswordReset(email: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log(`[MockAuthService] Password reset email sent to: ${email}`);
  }

  onAuthStateChanged(callback: (user: User | null) => void): () => void {
    this.listeners.push(callback);
    setTimeout(() => callback(this.currentUser), 0);
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  private notifyListeners(user: User | null) {
    this.listeners.forEach(l => l(user));
  }
}
