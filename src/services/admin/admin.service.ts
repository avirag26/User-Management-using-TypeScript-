import mongoose from 'mongoose';
import { safeUser } from '../../interfaces/user.interface';
import { AdminRepository } from '../../repositories/admin/admin.repo';
import { Bcrypt } from '../../utils/bcrypt';
import { CustomError } from '../../utils/customError';
import { IadminService } from './Iadmin.service';

export class AdminService implements IadminService {
  private adminRepository: AdminRepository;
  private bcrypt = new Bcrypt();
  constructor(adminRepository: AdminRepository) {
    this.adminRepository = adminRepository;
  }

  async checkAdminExist(email: string, password: string): Promise<safeUser> {
    const findAdmin = await this.adminRepository.findAdmin(email, 'admin');

    if (!findAdmin) {
      throw new CustomError('Invalid credintials', 404);
    }
    const isMatch = await this.bcrypt.comparePassword(
      password,
      findAdmin.password
    );

    if (!isMatch) {
      throw new CustomError('Invalid credintials', 400);
    }
    const { password: _, ...safeUser } = findAdmin;
    return safeUser;
  }
  async getAllUser(): Promise<safeUser[] | []> {
    return await this.adminRepository.findAllUser();
  }
  async findUser(id: string): Promise<safeUser> {
    const user = await this.adminRepository.getUserbyId(id);
    console.log(user);

    if (!user) {
      throw new CustomError('No user Found', 400);
    }
    return user;
  }

  async deleteuser(id: string): Promise<boolean> {
    if (!mongoose.isValidObjectId(id)) {
      console.log('here');

      throw new CustomError('Invalid id', 400);
    }
    const result = await this.adminRepository.deleteUserbyId(id);
    if (!result) {
      throw new CustomError('No user Found', 400);
    }
    return !!result;
  }
}
