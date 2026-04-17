import { MockAuthService } from './mockAuthService';

// Switch this import to use FirebaseAuthService when ready:
// import { FirebaseAuthService } from './firebaseAuthService';
export const authService = new MockAuthService();
export type { IAuthService } from './IAuthService';
