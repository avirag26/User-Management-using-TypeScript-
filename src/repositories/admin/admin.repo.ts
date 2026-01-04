import { safeUser, User } from '../../interfaces/user.interface';
import { userModel } from '../../models/user.model';
import { Iadmin } from './Iadmin.repo';

export class AdminRepository implements Iadmin {
  constructor() {}

  async findAdmin(email: string, role: 'user' | 'admin'): Promise<User | null> {
    return await userModel.findOne({ email, role }).lean();
  }

  async findAllUser(): Promise<safeUser[] | []> {
    return await userModel.find({ role: 'user' }, { password: 0 }).lean();
  }
  async getUserbyId(id: string): Promise<safeUser | null> {
    return await userModel.findById(id).select('-password');
  }
  async deleteUserbyId(id: string): Promise<safeUser | null> {
    return await userModel.findByIdAndDelete(id).select('password');
  }
}
