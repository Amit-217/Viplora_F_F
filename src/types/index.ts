export type UserRole = 'admin' | 'volunteer' | 'user';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isVerified: boolean;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    role: UserRole;
  };
  message?: string;
}

export interface ApiResponse<T> {
  message: string;
  data?: T;
}
