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
import { ISupplier } from '../types';
import Product from './Product';

@Table({
  tableName: 'suppliers',
  timestamps: true,
})
export default class Supplier extends Model<ISupplier> implements ISupplier {
  @PrimaryKey
  @Default(() => uuidv4())
  @Column(DataType.UUID)
  supplierId!: string;

  @AllowNull(false)
  @Column(DataType.STRING(100))
  supplierName!: string;

  @Column(DataType.STRING(100))
  contactPerson?: string;

  @Column(DataType.STRING(255))
  email?: string;

  @Column(DataType.STRING(20))
  phone?: string;

  @Column(DataType.TEXT)
  address?: string;

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
  public static async findActiveSuppliers(): Promise<Supplier[]> {
    return Supplier.findAll({ where: { isActive: true } });
  }

  public static async findByName(supplierName: string): Promise<Supplier | null> {
    return Supplier.findOne({ where: { supplierName, isActive: true } });
  }
}