import bcrypt from 'bcrypt';

export class Bcrypt {
  async hashPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  }

  async comparePassword(password: string, password2: string): Promise<boolean> {
    return await bcrypt.compare(password, password2);
  }
}
