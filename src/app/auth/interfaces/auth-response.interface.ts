export interface AuthResponse {
  user: User;
  token: string;
}
export type UserRole = 'user' | 'super' | 'admin';

export interface User {
  id: string;
  email: string;
  fullName: string;
  isActive: boolean;
  roles: UserRole[];
}
