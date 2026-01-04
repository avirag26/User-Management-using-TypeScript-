import { User } from '../../interfaces/user.interface';
import { safeUser } from '../../interfaces/user.interface';

export interface IuserService {
  createUser: (user: User) => Promise<User>;
  UserExistence(email: string, password: string): Promise<safeUser>;
  updateUser(id: string, user: Partial<User>): Promise<safeUser>;
  getUser(id: string): Promise<safeUser>;
  changePassword(
    id: string,
    currentPass: string,
    newPass: string
  ): Promise<boolean>;
}
