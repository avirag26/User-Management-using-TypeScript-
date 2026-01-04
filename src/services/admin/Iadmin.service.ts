import { safeUser, User } from '../../interfaces/user.interface';

export interface IadminService {
  checkAdminExist(email: string, password: string): Promise<safeUser>;
  getAllUser(): Promise<safeUser[] | []>;
  findUser(id: string): Promise<safeUser>;
  deleteuser(id: string): Promise<boolean>;
}
