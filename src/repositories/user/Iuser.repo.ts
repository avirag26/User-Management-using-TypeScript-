import { safeUser, User } from '../../interfaces/user.interface';

export interface IUserRepo {
  findUserByEmail(email: string): Promise<User | null>;
  createUser(user: User): Promise<User>;
  findUserById(id: string): Promise<User | null>;
  updateUserById(id: string, user: Partial<User>): Promise<safeUser | null>;
  updatePassword(id: string, password: string): Promise<safeUser | null>;
}
