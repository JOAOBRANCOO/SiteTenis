export interface User {
  uid: string;
  email: string;
  displayName: string | null;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
}

export interface SignInCredentials {
  email: string;
  password: string;
}
