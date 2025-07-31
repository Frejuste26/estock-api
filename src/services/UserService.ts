import { BaseService } from './BaseService';
import User from '../models/User';
import { IUser, UserRole } from '../types';

export class UserService extends BaseService<User> {
  constructor() {
    super(User);
  }

  protected getPrimaryKey(): string {
    return 'userId';
  }

  public async findByEmail(email: string): Promise<User | null> {
    return User.findByEmail(email);
  }

  public async findActiveUsers(): Promise<User[]> {
    return User.findActiveUsers();
  }

  public async createUser(userData: Partial<IUser>): Promise<User> {
    return this.create(userData);
  }

  public async updateUser(userId: string, userData: Partial<IUser>): Promise<User | null> {
    const [affectedCount, updatedUsers] = await this.update(userId, userData);
    return affectedCount > 0 ? updatedUsers[0] : null;
  }

  public async deactivateUser(userId: string): Promise<boolean> {
    const [affectedCount] = await this.update(userId, { isActive: false });
    return affectedCount > 0;
  }

  public async changeUserRole(userId: string, role: UserRole): Promise<User | null> {
    return this.updateUser(userId, { role });
  }

  public async validatePassword(user: User, password: string): Promise<boolean> {
    return user.comparePassword(password);
  }
}