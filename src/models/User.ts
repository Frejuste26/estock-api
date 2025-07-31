import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  AllowNull,
  Unique,
  HasMany,
  BeforeCreate,
  BeforeUpdate,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import { UserRole, IUser } from '../types';
import StockMovement from './StockMovement';

@Table({
  tableName: 'users',
  timestamps: true,
})
export default class User extends Model<IUser> implements IUser {
  @PrimaryKey
  @Default(() => uuidv4())
  @Column(DataType.UUID)
  userId!: string;

  @AllowNull(false)
  @Column(DataType.STRING(100))
  username!: string;

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING(255))
  email!: string;

  @AllowNull(false)
  @Column(DataType.STRING(255))
  password!: string;

  @AllowNull(false)
  @Default(UserRole.EMPLOYEE)
  @Column(DataType.ENUM(...Object.values(UserRole)))
  role!: UserRole;

  @AllowNull(false)
  @Default(true)
  @Column(DataType.BOOLEAN)
  isActive!: boolean;

  @Column(DataType.DATE)
  createdAt!: Date;

  @Column(DataType.DATE)
  updatedAt!: Date;

  // Associations
  @HasMany(() => StockMovement)
  stockMovements!: StockMovement[];

  // Hooks
  @BeforeCreate
  @BeforeUpdate
  static async hashPassword(instance: User): Promise<void> {
    if (instance.changed('password')) {
      const saltRounds = 12;
      instance.password = await bcrypt.hash(instance.password, saltRounds);
    }
  }

  // Instance methods
  public async comparePassword(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
  }

  public toJSON(): Partial<IUser> {
    const values = { ...this.get() };
    delete values.password;
    return values;
  }

  // Static methods
  public static async findByEmail(email: string): Promise<User | null> {
    return User.findOne({ where: { email, isActive: true } });
  }

  public static async findActiveUsers(): Promise<User[]> {
    return User.findAll({ where: { isActive: true } });
  }
}