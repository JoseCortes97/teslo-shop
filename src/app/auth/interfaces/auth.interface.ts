export type UserRole = 'user' | 'super' | 'admin';

export interface User {
  id: string;
  email: string;
  fullName: string;
  isActive: boolean;
  roles: UserRole[];
}

export type AuthStatus = 'authenticated' | 'unauthenticated' | 'checking';
