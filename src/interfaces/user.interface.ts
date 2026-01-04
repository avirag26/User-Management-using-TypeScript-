export interface User {
  username: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
}

export type safeUser = Omit<User, 'password'>;
