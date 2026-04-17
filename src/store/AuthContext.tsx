import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthState, User, SignInCredentials } from '../types/auth';
import { authService } from '../services/auth';

interface AuthContextType extends AuthState {
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({ user: null, loading: true });

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((user: User | null) => {
      setState({ user, loading: false });
    });
    return unsubscribe;
  }, []);

  const signIn = async (credentials: SignInCredentials) => {
    const user = await authService.signIn(credentials);
    setState(prev => ({ ...prev, user }));
  };

  const signOut = async () => {
    await authService.signOut();
    setState(prev => ({ ...prev, user: null }));
  };

  const sendPasswordReset = async (email: string) => {
    await authService.sendPasswordReset(email);
  };

  return (
    <AuthContext.Provider value={{ ...state, signIn, signOut, sendPasswordReset }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
