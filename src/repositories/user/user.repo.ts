import { safeUser, User } from '../../interfaces/user.interface';
import { userModel } from '../../models/user.model';
import { IUserRepo } from './Iuser.repo';

export class UserRepository implements IUserRepo {
  constructor() {}

  async findUserByEmail(email: string): Promise<User | null> {
    return await userModel.findOne({ email }).lean();
  }

  async createUser(user: User): Promise<User> {
    return await userModel.create(user);
  }
  async findUserById(id: string): Promise<User | null> {
    return await userModel.findById(id).lean();
  }

  async updateUserById(
    id: string,
    user: Partial<User>
  ): Promise<safeUser | null> {
    return await userModel.findByIdAndUpdate(id, user, {
      new: true,
      runValidators: true,
    });
  }
  async updatePassword(id: string, password: string): Promise<safeUser | null> {
    return await userModel.findByIdAndUpdate(
      id,
      { password: password },
      { new: true }
    );
  }
}
