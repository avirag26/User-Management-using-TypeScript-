import { safeUser, User } from '../../interfaces/user.interface';

export interface Iadmin {
  findAdmin(email: string, role: 'user' | 'admin'): Promise<User | null>;
  findAllUser(): Promise<safeUser[] | []>;
  getUserbyId(id: string): Promise<safeUser | null>;
  deleteUserbyId(id: string): Promise<safeUser | null>;
}
