import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  AllowNull,
  HasMany,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { ICategory } from '../types';
import Product from './Product';

@Table({
  tableName: 'categories',
  timestamps: true,
})
export default class Category extends Model<ICategory> implements ICategory {
  @PrimaryKey
  @Default(() => uuidv4())
  @Column(DataType.UUID)
  categoryId!: string;

  @AllowNull(false)
  @Column(DataType.STRING(100))
  categoryName!: string;

  @Column(DataType.TEXT)
  description?: string;

  @AllowNull(false)
  @Default(true)
  @Column(DataType.BOOLEAN)
  isActive!: boolean;

  @Column(DataType.DATE)
  createdAt!: Date;

  @Column(DataType.DATE)
  updatedAt!: Date;

  // Associations
  @HasMany(() => Product)
  products!: Product[];

  // Static methods
  public static async findActiveCategories(): Promise<Category[]> {
    return Category.findAll({ where: { isActive: true } });
  }

  public static async findByName(categoryName: string): Promise<Category | null> {
    return Category.findOne({ where: { categoryName, isActive: true } });
  }
}