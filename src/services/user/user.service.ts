import { User } from '../../interfaces/user.interface';
import { IUserRepo } from '../../repositories/user/Iuser.repo';
import { Bcrypt } from '../../utils/bcrypt';
import { IuserService } from './Iuser.service';
import { safeUser } from '../../interfaces/user.interface';
import mongoose from 'mongoose';
import { CustomError } from '../../utils/customError';

export class UserService implements IuserService {
  private userRepository: IUserRepo;
  private bcrypt: Bcrypt;
  constructor(userRepo: IUserRepo) {
    this.userRepository = userRepo;
    this.bcrypt = new Bcrypt();
  }
  async createUser(user: User): Promise<User> {
    const isEmailExist = await this.userRepository.findUserByEmail(user.email);
    if (isEmailExist) {
      throw new Error('Email already exist');
    }
    const hashedPassword = await this.bcrypt.hashPassword(user.password);
    const userData = {
      ...user,
      role: user.role ?? ('user' as const),
      password: hashedPassword,
    };

    return await this.userRepository.createUser(userData);
  }
  async UserExistence(email: string, password: string): Promise<safeUser> {
    const findUser = await this.userRepository.findUserByEmail(email);
    if (!findUser) {
      throw new CustomError('Invalid Credintials');
    }
    const isMatch = await this.bcrypt.comparePassword(
      password,
      findUser.password
    );
    if (!isMatch) {
      throw new CustomError('Invalid Credintials');
    }
    const { password: _, ...safeUser } = findUser;
    return safeUser;
  }
  async updateUser(id: string, user: Partial<User>): Promise<safeUser> {
    if (!mongoose.isValidObjectId(id)) {
      throw new CustomError('Invalid UserId', 400);
    }
    const userExist = this.userRepository.findUserById(id);
    if (!userExist) throw new CustomError('No user found', 404);
    const updatedUser = await this.userRepository.updateUserById(id, user);
    if (!updatedUser) throw new CustomError('No user Found', 400);
    return updatedUser;
  }
  async changePassword(
    id: string,
    currentPass: string,
    newPass: string
  ): Promise<boolean> {
    if (!mongoose.isValidObjectId(id)) {
      throw new CustomError('Invalid id');
    }
    const user = await this.userRepository.findUserById(id);
    if (!user) throw new Error('No user Found');

    const isMatch = await this.bcrypt.comparePassword(
      currentPass,
      user.password
    );
    if (!isMatch) throw new CustomError('Password inncorect', 400);

    const hashedPassword = await this.bcrypt.hashPassword(newPass);
    const result = await this.userRepository.updatePassword(id, hashedPassword);
    if (!result) throw new CustomError('Password not changed', 400);
    return true;
  }

  async getUser(id: string): Promise<safeUser> {
    if (!mongoose.isValidObjectId(id)) {
      throw new CustomError('Invalid Id', 400);
    }
    const user = await this.userRepository.findUserById(id);
    if (!user) throw new CustomError('No user Found', 400);
    return user;
  }
}
